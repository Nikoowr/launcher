import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';

import axios from 'axios';
import { app } from 'electron';
import getMAC from 'getmac';
import * as yauzl from 'yauzl';

import {
  GAME_CLIENT_FOLDER,
  StagesEnum,
} from '../../constants/stage.constants';
import { NodeEnvsEnum } from '../constants/env.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  EnvConfig,
  FileConfigDto,
  FileConfig as FileConfigInterface,
  FileConfigOpenExecutableDto,
  FileConfigUnzipDto,
  FileConfigWriteDto,
  OnProgress,
} from '../interfaces';

export class FileConfig implements FileConfigInterface {
  public readonly adminConfigDirectory: string;
  public readonly resourcesDirectory: string;
  public readonly userDataDirectory: string;
  private readonly exec = promisify(exec);
  private activeDownloads: Set<string> = new Set();
  private unzipTotalRead = 0;

  constructor(private readonly envConfig: EnvConfig) {
    this.adminConfigDirectory =
      this.envConfig.NODE_ENV === NodeEnvsEnum.Development
        ? path.resolve(__dirname, '..', '..', '..', 'tmp')
        : path.resolve(path.dirname(app.getPath('exe')));

    this.userDataDirectory =
      this.envConfig.NODE_ENV === NodeEnvsEnum.Development
        ? path.resolve(__dirname, '..', '..', '..', 'tmp', 'userData')
        : path.resolve(path.dirname(app.getPath('userData')));

    this.resourcesDirectory = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '..', '..', '..', 'assets');
  }

  public get gameDirectory() {
    const jsonData = this.read({
      filename: UserDataStorageFilenamesEnum.AdminConfig,
      directory: this.adminConfigDirectory,
    });

    const { stage = null } = JSON.parse(jsonData || '{}') || {};

    const validStage = Object.values(StagesEnum).find(
      (stageEnum) => stageEnum === stage,
    );

    const clientFolderName = GAME_CLIENT_FOLDER[validStage || StagesEnum.Prod];

    const gameDirectoryPath =
      this.envConfig.NODE_ENV === NodeEnvsEnum.Development
        ? path.resolve(__dirname, '..', '..', '..', 'tmp', clientFolderName)
        : path.resolve(
            path.dirname(app.getPath('exe')),
            'apps',
            clientFolderName,
          );

    return gameDirectoryPath;
  }

  public get i18nDirectory() {
    return path.join(this.gameDirectory, 'data', 'i18n');
  }

  public get gameTranslateDirectory() {
    return path.join(this.gameDirectory, 'data', 'translate');
  }

  public get MAC() {
    let mac = '';

    try {
      mac = getMAC();
    } catch (error) {
      console.error(error);
    }

    return mac;
  }

  public async download({
    onProgress,
    directory,
    filename,
    url,
    id,
  }: FileConfigDto): Promise<string> {
    if (this.activeDownloads.has(id)) {
      throw new Error(`Download with ID ${id} is already in progress.`);
    }

    this.activeDownloads.add(id);

    const response = await axios.get(url, {
      responseType: 'stream',
    });

    const filepath = path.resolve(directory, filename);
    const fileDirectory = path.dirname(filepath);

    fs.mkdirSync(fileDirectory, { recursive: true });

    const writeStream = fs.createWriteStream(filepath);

    return new Promise((resolve, reject) => {
      response.data.pipe(writeStream);

      let totalDownloaded = 0;
      const totalSize = Number(response.headers['content-length']);

      response.data.on('data', (chunk: { length: number }) => {
        totalDownloaded += chunk.length;

        if (onProgress && totalSize) {
          const progress = Math.round((totalDownloaded * 100) / totalSize);
          onProgress({ progress });
        }
      });

      response.data.on('end', () => {
        resolve(filepath);
      });

      response.data.on('error', (error: unknown) => {
        reject(error);
      });

      writeStream.on('finish', () => {
        this.activeDownloads.delete(id);
      });
    });
  }

  public read({
    directory,
    filename,
  }: {
    directory: string;
    filename: string;
  }): string | null {
    try {
      const filepath = path.join(directory, filename);
      const file = fs.readFileSync(filepath, 'utf-8');

      return file.toString();
    } catch {
      return null;
    }
  }

  public exists(dto: { directory: string; filename: string }): boolean {
    const filepath = path.join(dto.directory, dto.filename);

    return fs.existsSync(filepath);
  }

  public async write({
    directory,
    filename,
    data,
  }: FileConfigWriteDto): Promise<string> {
    const filepath = path.join(directory, filename);

    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(filepath, data, 'utf-8');

    return filepath;
  }

  public async delete({
    directory,
    filename,
  }: {
    directory: string;
    filename: string;
  }): Promise<void> {
    const filepath = path.join(directory, filename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }

  public async openExecutable({
    executable,
    directory,
    props = [],
  }: FileConfigOpenExecutableDto): Promise<void> {
    await this.exec(
      `start "" "${path.join(directory, executable)}" ${props.join(' ')}`,
      {
        cwd: directory,
      },
    );
  }

  public async unzip({
    source,
    destination,
    onProgress,
  }: FileConfigUnzipDto): Promise<void> {
    const totalSize: number = await this.getZipTotalSize(source);

    return new Promise((resolve, reject) => {
      yauzl.open(source, { lazyEntries: true }, (err, zipfile) => {
        if (err) {
          reject(err);

          return;
        }

        zipfile.readEntry();

        this.unzipTotalRead = 0;

        zipfile.on('entry', (entry) => {
          this.extractZipEntry(
            zipfile,
            entry,
            destination,
            totalSize,
            onProgress,
          )
            .then(() => {})
            .catch((error) => reject(error));
        });

        zipfile.on('end', () => {
          resolve();
        });
      });
    });
  }

  public getAssetPath(asset: string) {
    return path.join(this.resourcesDirectory, asset);
  }

  public async copyFolderWithOverwrite({
    dest,
    src,
  }: {
    dest: string;
    src: string;
  }): Promise<void> {
    if (fs.existsSync(dest)) {
      await fs.promises.rm(dest, { recursive: true, force: true });
    }

    await fs.promises.mkdir(dest, { recursive: true });
    await fs.promises.cp(src, dest, { recursive: true });
  }

  public joinPaths(paths: string[]): string {
    return path.join(...paths);
  }

  private async getZipTotalSize(source: string): Promise<number> {
    return new Promise((resolve, reject) => {
      yauzl.open(source, { lazyEntries: true }, (err, zipfile) => {
        if (err) {
          reject(err);

          return;
        }

        let totalSize = 0;

        zipfile.readEntry();

        zipfile.on('entry', (entry) => {
          if (!/\/$/.test(entry.fileName)) {
            totalSize += entry.uncompressedSize;
          }

          zipfile.readEntry();
        });

        zipfile.on('end', () => {
          resolve(totalSize);
        });
      });
    });
  }

  private async extractZipEntry(
    zipfile: yauzl.ZipFile,
    entry: yauzl.Entry,
    destination: string,
    totalSize: number,
    onProgress?: OnProgress,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const fileDestination = path.join(destination, entry.fileName);

      if (/\/$/.test(entry.fileName)) {
        fs.mkdirSync(fileDestination, { recursive: true });
        zipfile.readEntry();

        return;
      }

      zipfile.openReadStream(entry, (error, readStream) => {
        if (error) {
          reject(error);

          return;
        }

        const writeStream = fs.createWriteStream(fileDestination);

        readStream.on('data', (chunk) => {
          this.unzipTotalRead += chunk.length;
          this.unzipTotalRead = Math.min(this.unzipTotalRead, totalSize);

          const progress = Math.round((this.unzipTotalRead * 100) / totalSize);

          if (onProgress) {
            onProgress({ progress, filename: entry?.fileName });
          }
        });

        readStream.pipe(writeStream);

        readStream.on('end', () => {
          zipfile.readEntry();
          resolve();
        });
      });
    });
  }
}
