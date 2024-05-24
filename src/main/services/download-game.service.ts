import {
  CLIENT_BUCKET_URL,
  DOWNLOAD_GAME_ZIP_FILENAME,
} from '../../constants/stage.constants';
import {
  GameDownloadStatusEnum,
  GameFilesEnum,
} from '../constants/game.constants';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  ApiConfig,
  DownloadGameServiceDto,
  DownloadGameService as DownloadGameServiceInterface,
  FileConfig,
  StageConfig,
  UnzipConfig,
} from '../interfaces';

export class DownloadGameService implements DownloadGameServiceInterface {
  constructor(
    private readonly fileConfig: FileConfig,
    private readonly apiConfig: ApiConfig,
    private readonly stageConfig: StageConfig,
    private readonly unzipConfig: UnzipConfig,
  ) {}

  public async execute({ ipcEvent }: DownloadGameServiceDto): Promise<void> {
    if (this.isAlreadyDownloaded({ ipcEvent })) {
      return ipcEvent.reply(IpcEventsEnum.DownloadGame, {
        status: GameDownloadStatusEnum.Done,
        progress: 100,
      });
    }

    const { zipFilename, downloadedFilePath } = await this.downloadZip({
      ipcEvent,
    });

    await this.extractZip({ ipcEvent, zipFilename, downloadedFilePath });

    const gameInfoJson = this.fileConfig.read({
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

  private isAlreadyDownloaded({ ipcEvent }: DownloadGameServiceDto) {
    try {
      ipcEvent.reply(IpcEventsEnum.DownloadGame, {
        status: GameDownloadStatusEnum.Checking,
        progress: 1,
      });

      const gameInfoJson = this.fileConfig.read({
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
    const stage = this.stageConfig.get();
    const zipFilename = DOWNLOAD_GAME_ZIP_FILENAME[stage];

    const downloadUrl = await this.getDownloadUrl({ filename: zipFilename });

    ipcEvent.reply(IpcEventsEnum.DownloadGame, {
      status: GameDownloadStatusEnum.Downloading,
      progress: 0,
    });

    const downloadedFilePath = await this.fileConfig.download({
      directory: this.fileConfig.gameDirectory,
      filename: zipFilename,
      url: downloadUrl,
      id: downloadUrl,
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

    await this.unzipConfig.unzip({
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

  private async getDownloadUrl({ filename }: { filename: string }) {
    const DEFAULT_DOWNLOAD_URL = `${CLIENT_BUCKET_URL}${filename}`;

    try {
      const downloadUrl = await this.apiConfig.getDownloadUrl();

      if (!downloadUrl) {
        return DEFAULT_DOWNLOAD_URL;
      }

      return downloadUrl;
    } catch (error) {
      console.error(error);

      return DEFAULT_DOWNLOAD_URL;
    }
  }
}
