import fs from 'node:fs';
import path from 'node:path';

import axios from 'axios';

import { NODE_ENV } from '../constants/env.constants';
import {
  FileConfigDto,
  FileConfig as FileConfigInterface,
} from '../interfaces';

export const GAME_DIRECTORY =
  NODE_ENV === 'development'
    ? path.resolve(__dirname, '..', '..', '..', 'tmp')
    : path.resolve(__dirname);

export class FileConfig implements FileConfigInterface {
  public gameDirectory(): string {
    return GAME_DIRECTORY;
  }

  public async download({
    directory,
    filename,
    url,
  }: FileConfigDto): Promise<string> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    const filepath = path.resolve(directory, filename);
    const fileDirectory = path.dirname(filepath);

    fs.mkdirSync(fileDirectory, { recursive: true });
    fs.writeFileSync(filepath, Buffer.from(response.data));

    return filepath;
  }

  public async read({ filepath }: { filepath: string }): Promise<string> {
    const file = fs.readFileSync(filepath, 'utf-8');

    return file.toString();
  }
}
