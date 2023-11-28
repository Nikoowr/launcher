import { FileConfig } from '../configs';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  CryptographyConfig,
  EnvConfig,
  GetUserSessionServiceDto,
  GetUserSessionService as GetUserSessionServiceInterface,
} from '../interfaces';

export class GetUserSessionService implements GetUserSessionServiceInterface {
  constructor(
    private readonly cryptographyConfig: CryptographyConfig,
    private readonly fileConfig: FileConfig,
    private readonly envConfig: EnvConfig,
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
      key: this.envConfig.USER_DATA_ENCRYPTION_KEY,
      data: encryptedSession,
    });

    const [user] = session.split('::');

    ipcEvent.reply(IpcEventsEnum.GetUserSession, { user });
  }
}
