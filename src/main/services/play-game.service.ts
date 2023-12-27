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
    const encryptedLogin = await this.fileConfig.read({
      filename: UserDataStorageFilenamesEnum.UserLogin,
      directory: this.fileConfig.userDataDirectory,
    });

    if (!encryptedLogin) {
      throw new Error('Login not found');
    }

    const login = await this.cryptographyConfig.decrypt({
      key: this.envConfig.USER_DATA_ENCRYPTION_KEY,
      data: encryptedLogin,
    });

    const [user, password] = login.split(':');

    await this.fileConfig.openExecutable({
      props: ['EasyFun', `-a ${user}`, `-p ${password}`],
      directory: this.fileConfig.gameDirectory,
      executable: 'GrandFantasia.exe',
    });

    ipcEvent.reply(IpcEventsEnum.Play);
  }
}
