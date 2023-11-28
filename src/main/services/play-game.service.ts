import { IpcEventsEnum } from '../constants/ipc-events.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  CryptographyConfig,
  EnvConfig,
  FileConfig,
  PlayGameServiceDto,
  PlayGameService as PlayGameServiceInterface,
} from '../interfaces';

export class PlayGameService implements PlayGameServiceInterface {
  constructor(
    private readonly cryptographyConfig: CryptographyConfig,
    private readonly fileConfig: FileConfig,
    private readonly envConfig: EnvConfig,
  ) {}

  public async execute({ ipcEvent }: PlayGameServiceDto): Promise<void> {
    const encryptedSession = await this.fileConfig.read({
      filename: UserDataStorageFilenamesEnum.UserSession,
      directory: this.fileConfig.userDataDirectory,
    });

    if (!encryptedSession) {
      throw new Error('Session not found');
    }

    const session = await this.cryptographyConfig.decrypt({
      key: this.envConfig.USER_DATA_ENCRYPTION_KEY,
      data: encryptedSession,
    });

    const [user, password] = session.split('::');

    await this.fileConfig.openExecutable({
      props: ['EasyFun', `-a ${user}`, `-p ${password}`],
      directory: this.fileConfig.gameDirectory,
      executable: 'GrandFantasia.exe',
    });

    ipcEvent.reply(IpcEventsEnum.Play);
  }
}
