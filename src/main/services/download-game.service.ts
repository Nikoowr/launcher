import { GameStatusEnum } from '../constants/game.constants';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  DownloadGameServiceDto,
  DownloadGameService as DownloadGameServiceInterface,
  EnvConfig,
  FileConfig,
} from '../interfaces';

export class DownloadGameService implements DownloadGameServiceInterface {
  constructor(
    private readonly fileConfig: FileConfig,
    private readonly envConfig: EnvConfig,
  ) {}

  public async execute({ ipcEvent }: DownloadGameServiceDto): Promise<void> {
    const { zipFilename, downloadedFilePath } = await this.downloadZip({
      ipcEvent,
    });

    await this.extractZip({ ipcEvent, zipFilename, downloadedFilePath });

    return ipcEvent.reply(IpcEventsEnum.UpdateGame, {
      status: GameStatusEnum.Done,
      progress: 100,
    });
  }

  private async downloadZip({ ipcEvent }: DownloadGameServiceDto) {
    const zipFilename = 'gfchaos-client.zip';
    const fileUrl = `${this.envConfig.CLIENT_BUCKET_URL}${zipFilename}`;

    ipcEvent.reply(IpcEventsEnum.UpdateGame, {
      status: GameStatusEnum.Downloading,
      progress: 0,
    });

    const downloadedFilePath = await this.fileConfig.download({
      directory: this.fileConfig.gameDirectory,
      filename: zipFilename,
      url: fileUrl,
      id: fileUrl,
      onProgress: ({ progress }) => {
        ipcEvent.reply(IpcEventsEnum.UpdateGame, {
          status: GameStatusEnum.Downloading,
          progress,
        });
      },
    });

    return { downloadedFilePath, zipFilename };
  }

  private async extractZip({
    downloadedFilePath,
    zipFilename,
    ipcEvent,
  }: DownloadGameServiceDto & {
    downloadedFilePath: string;
    zipFilename: string;
  }) {
    ipcEvent.reply(IpcEventsEnum.UpdateGame, {
      status: GameStatusEnum.Extracting,
      progress: 0,
    });

    await this.fileConfig.unzip({
      destination: this.fileConfig.gameDirectory,
      source: downloadedFilePath,
      onProgress: ({ progress, filename }) => {
        ipcEvent.reply(IpcEventsEnum.UpdateGame, {
          status: GameStatusEnum.Extracting,
          currentFilename: filename,
          progress,
        });
      },
    });

    await this.fileConfig.delete({
      directory: this.fileConfig.gameDirectory,
      filename: zipFilename,
    });
  }
}
