import { FileConfig } from '../configs';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  GetUserSessionServiceDto,
  GetUserSessionService as GetUserSessionServiceInterface,
  Session,
} from '../interfaces';

export class GetUserSessionService implements GetUserSessionServiceInterface {
  constructor(private readonly fileConfig: FileConfig) {}

  public async execute({ ipcEvent }: GetUserSessionServiceDto): Promise<void> {
    const sessionJson = await this.fileConfig.read({
      filename: UserDataStorageFilenamesEnum.UserSession,
      directory: this.fileConfig.userDataDirectory,
    });

    if (!sessionJson) {
      return ipcEvent.reply(IpcEventsEnum.GetUserSession, null);
    }

    const session = JSON.parse(sessionJson) as Session;

    ipcEvent.reply(IpcEventsEnum.GetUserSession, session);
  }
}
