import {
  BUCKET_BASE_URL,
  LatestFilesEnum,
  StagesEnum,
} from '../constants/env.constants';
import { GameFilesEnum } from '../constants/game.constants';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  CheckForUpdatesServiceDto,
  CheckForUpdatesService as CheckForUpdatesServiceInterface,
  FileConfig,
  GameInfo,
  RequestConfig,
  StageConfig,
  VersionConfig,
} from '../interfaces';

export class CheckForUpdatesService implements CheckForUpdatesServiceInterface {
  constructor(
    private readonly stageConfig: StageConfig,
    private readonly request: RequestConfig,
    private readonly fileConfig: FileConfig,
    private readonly versionConfig: VersionConfig,
  ) {}

  public async execute({ ipcEvent }: CheckForUpdatesServiceDto): Promise<void> {
    console.log('[CheckForUpdatesService] - Checking for updates...');

    const stage = this.stageConfig.get();

    const { data: client } = await this.request.get<{
      version: string;
      hash: string;
    }>(this.getBucketUrl({ stage, filename: LatestFilesEnum.Client }));

    const gameInfoString = this.fileConfig.read({
      directory: this.fileConfig.gameDirectory,
      filename: GameFilesEnum.GameInfo,
    });

    if (!gameInfoString) {
      throw new Error('[CheckForUpdatesService] - File game.json not found');
    }

    const gameInfo: GameInfo = JSON.parse(gameInfoString);

    const hasClientUpdate = this.versionConfig.versionIsGreater(
      client.version,
      gameInfo.version || 'v0.0.0',
    );

    const updates = {
      client: hasClientUpdate,
    };

    console.log(
      `[CheckForUpdatesService] - Done, updates: ${JSON.stringify(
        updates,
        null,
        2,
      )}`,
    );

    ipcEvent.reply(IpcEventsEnum.CheckForUpdates, updates);
  }

  private getBucketUrl({
    filename,
    stage,
  }: {
    filename: LatestFilesEnum;
    stage: StagesEnum;
  }) {
    return `${BUCKET_BASE_URL}/latest/${stage}/${filename}`;
  }
}
