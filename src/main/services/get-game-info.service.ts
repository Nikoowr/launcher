import { FileConfig } from '../configs';
import { GameFilesEnum } from '../constants/game.constants';
import {
  ExecutableGameConfig,
  GameInfo,
  GetGameInfoService as GetGameInfoServiceInterface,
} from '../interfaces';

export class GetGameInfoService implements GetGameInfoServiceInterface {
  constructor(
    private readonly executableGameConfig: ExecutableGameConfig,
    private readonly fileConfig: FileConfig,
  ) {}

  public async execute(): Promise<GameInfo> {
    const gameInfoJson = this.fileConfig.read({
      directory: this.fileConfig.gameDirectory,
      filename: GameFilesEnum.GameInfo,
    });

    const gameInfo = gameInfoJson ? JSON.parse(gameInfoJson) : {};
    // const isRunning = await this.executableGameConfig.isRunning();
    const isRunning = false;

    return {
      downloadedAt: gameInfo?.downloadedAt,
      version: gameInfo?.version,
      lang: gameInfo?.lang,
      isRunning,
    };
  }
}
