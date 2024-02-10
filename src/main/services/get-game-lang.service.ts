import { LangsEnum } from '../../constants/locale.constants';
import { FileConfig } from '../configs';
import { GameFilesEnum } from '../constants/game.constants';
import { GetGameLangService as GetGameLangServiceInterface } from '../interfaces';

export class GetGameLangService implements GetGameLangServiceInterface {
  constructor(private readonly fileConfig: FileConfig) {}

  public async execute(): Promise<LangsEnum | null> {
    try {
      const gameInfoJson = this.fileConfig.read({
        directory: this.fileConfig.gameDirectory,
        filename: GameFilesEnum.GameInfo,
      });

      const gameInfo = gameInfoJson ? JSON.parse(gameInfoJson) : {};

      return gameInfo.lang ?? null;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}
