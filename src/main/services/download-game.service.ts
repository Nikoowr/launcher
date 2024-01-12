import {
  GameDownloadStatusEnum,
  GameFilesEnum,
} from '../constants/game.constants';
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
    const isAlreadyDownloaded = await this.isAlreadyDownloaded({ ipcEvent });

    if (isAlreadyDownloaded) {
      return ipcEvent.reply(IpcEventsEnum.DownloadGame, {
        status: GameDownloadStatusEnum.Done,
        progress: 100,
      });
    }

    const { zipFilename, downloadedFilePath } = await this.downloadZip({
      ipcEvent,
    });

    await this.extractZip({ ipcEvent, zipFilename, downloadedFilePath });

    const gameInfoJson = await this.fileConfig.read({
      directory: this.fileConfig.gameDirectory,
      filename: GameFilesEnum.GameInfo,
    });

    const gameInfo = JSON.parse(gameInfoJson || '{}');

    await this.fileConfig.write({
      data: JSON.stringify({
        ...gameInfo,
        downloadedAt: new Date().toISOString(),
      }),
      directory: this.fileConfig.gameDirectory,
      filename: GameFilesEnum.GameInfo,
    });

    return ipcEvent.reply(IpcEventsEnum.DownloadGame, {
      status: GameDownloadStatusEnum.Done,
      progress: 100,
    });
  }

  private async isAlreadyDownloaded({ ipcEvent }: DownloadGameServiceDto) {
    try {
      ipcEvent.reply(IpcEventsEnum.DownloadGame, {
        status: GameDownloadStatusEnum.Checking,
        progress: 1,
      });

      const gameInfoJson = await this.fileConfig.read({
        directory: this.fileConfig.gameDirectory,
        filename: GameFilesEnum.GameInfo,
      });

      if (!gameInfoJson) {
        return false;
      }

      const gameInfo = JSON.parse(gameInfoJson);

      return !!gameInfo?.downloadedAt;
    } catch (error) {
      console.error(error);

      throw error;
    } finally {
      ipcEvent.reply(IpcEventsEnum.DownloadGame, {
        status: GameDownloadStatusEnum.Checking,
        progress: 100,
      });
    }
  }

  private async downloadZip({ ipcEvent }: DownloadGameServiceDto) {
    const zipFilename = this.envConfig.DOWNLOAD_GAME_ZIP_FILENAME;
    const fileUrl = `${this.envConfig.CLIENT_BUCKET_URL}${zipFilename}`;

    ipcEvent.reply(IpcEventsEnum.DownloadGame, {
      status: GameDownloadStatusEnum.Downloading,
      progress: 0,
    });

    const downloadedFilePath = await this.fileConfig.download({
      directory: this.fileConfig.gameDirectory,
      filename: zipFilename,
      url: fileUrl,
      id: fileUrl,
      onProgress: ({ progress }) => {
        ipcEvent.reply(IpcEventsEnum.DownloadGame, {
          status: GameDownloadStatusEnum.Downloading,
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
    ipcEvent.reply(IpcEventsEnum.DownloadGame, {
      status: GameDownloadStatusEnum.Extracting,
      progress: 0,
    });

    await this.fileConfig.unzip({
      destination: this.fileConfig.gameDirectory,
      source: downloadedFilePath,
      onProgress: ({ progress, filename }) => {
        ipcEvent.reply(IpcEventsEnum.DownloadGame, {
          status: GameDownloadStatusEnum.Extracting,
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
