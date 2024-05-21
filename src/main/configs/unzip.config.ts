import fs from 'fs';
import path from 'node:path';

import progress from 'progress-stream';
import * as unzipper from 'unzipper';

import {
  UnzipConfigDto,
  UnzipConfig as UnzipConfigDtoInterface,
} from '../interfaces';

class UnzipConfig implements UnzipConfigDtoInterface {
  async unzip({
    destination,
    onProgress,
    source,
  }: UnzipConfigDto): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const zipFileSize = fs.statSync(source).size;

        const progressStream = progress({
          length: zipFileSize,
          time: 100,
        });

        progressStream.on('progress', (data) => {
          if (onProgress && typeof onProgress === 'function') {
            onProgress({ progress: Math.round(data.percentage) });
          }
        });

        const readStream = fs.createReadStream(source);

        readStream
          .pipe(progressStream)
          .pipe(unzipper.Parse())
          .on('entry', (entry: unzipper.Entry) => {
            const filepath = entry.path;

            if (entry.type === 'File') {
              const outputFilePath = `${destination}/${filepath}`;
              const dirname = path.dirname(outputFilePath);

              if (!fs.existsSync(dirname)) {
                fs.mkdirSync(dirname, { recursive: true });
              }

              entry.pipe(fs.createWriteStream(outputFilePath));

              if (onProgress && typeof onProgress === 'function') {
                onProgress({
                  progress: Math.round(progressStream.progress().percentage),
                  filename: filepath.split('/').pop(),
                });
              }
            } else {
              entry.autodrain();
            }
          })
          .on('close', () => {
            resolve();
          })
          .on('error', (err: Error) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export const unzip = new UnzipConfig();
