import {
  BUCKET_BASE_URL,
  StagesEnum,
  UpdateFilesEnum,
} from '../constants/env.constants';
import { GameUpdateStatusEnum } from '../constants/game.constants';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  DownloadLatestUpdatesServiceDto,
  DownloadLatestUpdatesService as DownloadLatestUpdatesServiceInterface,
  FileConfig,
  StageConfig,
  UnzipConfig,
} from '../interfaces';

export class DownloadLatestUpdatesService
  implements DownloadLatestUpdatesServiceInterface
{
  constructor(
    private readonly stageConfig: StageConfig,
    private readonly fileConfig: FileConfig,
    private readonly unzipConfig: UnzipConfig,
  ) {}

  public async execute({
    ipcEvent,
  }: DownloadLatestUpdatesServiceDto): Promise<void> {
    console.log(
      '[DownloadLatestUpdatesService] - Downloading latest updates...',
    );

    ipcEvent.reply(IpcEventsEnum.DownloadLatestUpdates, {
      status: GameUpdateStatusEnum.Downloading,
      progress: 0,
    });

    const stage = this.stageConfig.get();

    const url = this.getBucketUrl({ stage });
    const updateFilename = 'update.zip';

    const downloadedFilePath = await this.fileConfig.download({
      directory: this.fileConfig.gameDirectory,
      filename: updateFilename,
      id: url,
      url,
      onProgress: ({ progress }) => {
        ipcEvent.reply(IpcEventsEnum.DownloadLatestUpdates, {
          status: GameUpdateStatusEnum.Downloading,
          progress,
        });
      },
    });

    console.log('[DownloadLatestUpdatesService] - Extracting update.zip...');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log('[DownloadLatestUpdatesService] - Extracting update.zip...');

    await this.extractZip({
      zipFilename: updateFilename,
      downloadedFilePath,
      ipcEvent,
    });

    console.log('[DownloadLatestUpdatesService] - Done');
  }

  private getBucketUrl({ stage }: { stage: StagesEnum }) {
    return `${BUCKET_BASE_URL}/update/${stage}.zip`;
  }

  private async extractZip({
    downloadedFilePath,
    zipFilename,
    ipcEvent,
  }: {
    downloadedFilePath: string;
    zipFilename: string;
  } & DownloadLatestUpdatesServiceDto) {
    ipcEvent.reply(IpcEventsEnum.DownloadGame, {
      status: GameUpdateStatusEnum.Extracting,
      progress: 0,
    });

    console.log({
      destination: this.fileConfig.gameDirectory,
      source: downloadedFilePath,
    });

    await this.unzipConfig.unzip({
      destination: this.fileConfig.gameDirectory,
      source: downloadedFilePath,
      onProgress: ({ progress, filename }) => {
        ipcEvent.reply(IpcEventsEnum.DownloadLatestUpdates, {
          status: GameUpdateStatusEnum.Extracting,
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
