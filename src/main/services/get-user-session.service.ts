import { FileConfig } from '../configs';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import { USER_DATA_ENCRYPTION_KEY } from '../constants/security.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  CryptographyConfig,
  GetUserSessionServiceDto,
  GetUserSessionService as GetUserSessionServiceInterface,
} from '../interfaces';

export class GetUserSessionService implements GetUserSessionServiceInterface {
  constructor(
    private readonly cryptographyConfig: CryptographyConfig,
    private readonly fileConfig: FileConfig,
  ) {}

  public async execute({ ipcEvent }: GetUserSessionServiceDto): Promise<void> {
    const encryptedSession = await this.fileConfig.read({
      filename: UserDataStorageFilenamesEnum.UserSession,
      directory: this.fileConfig.userDataDirectory,
    });

    if (!encryptedSession) {
      return ipcEvent.reply(IpcEventsEnum.GetUserSession, {});
    }

    const session = await this.cryptographyConfig.decrypt({
      key: USER_DATA_ENCRYPTION_KEY,
      data: encryptedSession,
    });

    const [user] = session.split('::');

    ipcEvent.reply(IpcEventsEnum.GetUserSession, { user });
  }
}
