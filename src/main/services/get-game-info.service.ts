import { FileConfig } from '../configs';
import { GameFilesEnum } from '../constants/game.constants';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  GetGameInfoServiceDto,
  GetGameInfoService as GetGameInfoServiceInterface,
} from '../interfaces';

export class GetGameInfoService implements GetGameInfoServiceInterface {
  constructor(private readonly fileConfig: FileConfig) {}

  public async execute({ ipcEvent }: GetGameInfoServiceDto): Promise<void> {
    const gameInfoJson = await this.fileConfig.read({
      directory: this.fileConfig.gameDirectory,
      filename: GameFilesEnum.GameInfo,
    });

    const gameInfo = gameInfoJson ? JSON.parse(gameInfoJson) : {};

    ipcEvent.reply(IpcEventsEnum.GetGameInfo, gameInfo);
  }
}
