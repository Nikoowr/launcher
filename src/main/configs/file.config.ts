import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';

import axios from 'axios';
import { app } from 'electron';
import * as yauzl from 'yauzl';

import { NODE_ENV } from '../constants/env.constants';
import {
  FileConfigDto,
  FileConfig as FileConfigInterface,
  FileConfigOpenExecutableDto,
  FileConfigUnzipDto,
  FileConfigWriteDto,
  OnProgress,
} from '../interfaces';

export const GAME_DIRECTORY =
  NODE_ENV === 'development'
    ? path.resolve(__dirname, '..', '..', '..', 'tmp', 'gfchaos')
    : path.join(path.dirname(app.getPath('exe')), 'apps', 'gfchaos');

export const USER_DATA_DIRECTORY =
  NODE_ENV === 'development'
    ? path.resolve(__dirname, '..', '..', '..', 'tmp', 'userData')
    : path.join(path.dirname(app.getPath('userData')));

export class FileConfig implements FileConfigInterface {
  private readonly exec = promisify(exec);
  private unzipTotalRead = 0;

  public get userDataDirectory() {
    return USER_DATA_DIRECTORY;
  }

  public get gameDirectory() {
    return GAME_DIRECTORY;
  }

  public async download({
    onProgress,
    directory,
    filename,
    url,
  }: FileConfigDto): Promise<string> {
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
    });
  }

  public async read({
    directory,
    filename,
  }: {
    directory: string;
    filename: string;
  }): Promise<string> {
    const filepath = path.join(directory, filename);
    const file = fs.readFileSync(filepath, 'utf-8');

    return file.toString();
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
    return new Promise((resolve, reject) => {
      const filepath = path.join(directory, filename);

      fs.unlink(filepath, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public async openExecutable({
    executable,
    directory,
    props = [],
  }: FileConfigOpenExecutableDto): Promise<void> {
    await this.exec(
      `start ${path.join(directory, executable)} ${props.join(' ')}`,
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
