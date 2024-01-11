import { GameStatusEnum } from '../constants/api.constants';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  ApiConfig,
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
    private readonly apiConfig: ApiConfig,
  ) {}

  public async execute({ ipcEvent }: PlayGameServiceDto): Promise<void> {
    try {
      const applicationStatus = await this.apiConfig.getStatus();

      if (applicationStatus.game.status !== GameStatusEnum.Online) {
        return ipcEvent.reply(IpcEventsEnum.Play, applicationStatus.game);
      }

      await this.executeGame();

      return ipcEvent.reply(IpcEventsEnum.Play, applicationStatus.game);
    } catch (error) {
      console.error(error);

      return ipcEvent.reply(IpcEventsEnum.Play);
    }
  }

  private async executeGame() {
    const encryptedLogin = await this.fileConfig.read({
      filename: UserDataStorageFilenamesEnum.UserLogin,
      directory: this.fileConfig.gameDirectory,
    });

    if (!encryptedLogin) {
      throw new Error('Login not found');
    }

    const login = await this.cryptographyConfig.decrypt({
      key: this.envConfig.USER_DATA_ENCRYPTION_KEY,
      data: encryptedLogin,
    });

    const [user, password] = login.split(':');
    const hashedPassword = await this.cryptographyConfig.md5(password);

    await this.fileConfig.openExecutable({
      props: ['EasyFun', `-a ${user}`, `-p ${hashedPassword}`],
      directory: this.fileConfig.gameDirectory,
      executable: 'GrandFantasia.exe',
    });
  }
}
