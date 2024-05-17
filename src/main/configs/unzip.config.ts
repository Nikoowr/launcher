import fs from 'fs';

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
        // Obter o tamanho do arquivo zip
        const zipFileSize = fs.statSync(source).size;

        // Criar um stream de progresso
        const progressStream = progress({
          length: zipFileSize,
          time: 100, // Atualizar o progresso a cada 100ms
        });

        // Lidar com as atualizações de progresso
        progressStream.on('progress', (data) => {
          if (onProgress && typeof onProgress === 'function') {
            onProgress({ progress: Math.round(data.percentage) });
          }
        });

        // Criar um stream de leitura a partir do arquivo zip
        const readStream = fs.createReadStream(source);

        readStream
          .pipe(progressStream) // Pipe através do stream de progresso
          .pipe(unzipper.Parse()) // Parse o arquivo zip
          .on('entry', (entry: unzipper.Entry) => {
            const filename = entry.path;

            if (entry.type === 'File') {
              const outputFilePath = `${destination}/${filename}`;
              entry.pipe(fs.createWriteStream(outputFilePath));

              if (onProgress && typeof onProgress === 'function') {
                onProgress({
                  progress: Math.round(progressStream.progress().percentage),
                  filename,
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
