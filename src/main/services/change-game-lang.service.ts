import { LangsEnum } from '../../constants/locale.constants';
import { GameFilesEnum } from '../constants/game.constants';
import {
  ChangeGameLangService as ChangeGameLangServiceInterface,
  FileConfig,
  GameInfo,
} from '../interfaces';

export class ChangeGameLangService implements ChangeGameLangServiceInterface {
  private readonly i18TranslateFolderMap: { [key in LangsEnum]: string } = {
    [LangsEnum.PT]: 'pt-br',
    [LangsEnum.EN]: 'en',
    [LangsEnum.ES]: 'es',
    [LangsEnum.FR]: 'fr',
  };

  constructor(private readonly fileConfig: FileConfig) {}

  public async execute(lang: LangsEnum): Promise<void> {
    const gameInfo = this.getGameInfo();

    if (!gameInfo) {
      await this.saveGameInfoLang({ lang });

      return;
    }

    const langFolderMap = this.i18TranslateFolderMap[lang];

    const sourcePath = this.fileConfig.joinPaths([
      this.fileConfig.i18nDirectory,
      langFolderMap,
    ]);

    await this.fileConfig.copyFolderWithOverwrite({
      src: sourcePath,
      dest: this.fileConfig.gameTranslateDirectory,
    });

    await this.saveGameInfoLang({ ...gameInfo, lang });
  }

  private getGameInfo(): GameInfo | null {
    const gameInfoJson = this.fileConfig.read({
      directory: this.fileConfig.gameDirectory,
      filename: GameFilesEnum.GameInfo,
    });

    const gameInfo = gameInfoJson
      ? (JSON.parse(gameInfoJson) as GameInfo)
      : null;

    return gameInfo;
  }

  private async saveGameInfoLang(gameInfo: GameInfo) {
    await this.fileConfig.write({
      directory: this.fileConfig.gameDirectory,
      filename: GameFilesEnum.GameInfo,
      data: JSON.stringify(gameInfo),
    });
  }
}
