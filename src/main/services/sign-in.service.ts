import { IpcEventsEnum } from '../constants/ipc-events.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  CryptographyConfig,
  EnvConfig,
  FileConfig,
  SignInServiceDto,
  SignInService as SignInServiceInterface,
} from '../interfaces';

export class SignInService implements SignInServiceInterface {
  constructor(
    private readonly cryptographyConfig: CryptographyConfig,
    private readonly fileConfig: FileConfig,
    private readonly envConfig: EnvConfig,
  ) {}

  public async execute({
    password,
    ipcEvent,
    user,
  }: SignInServiceDto): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const combinedText = `${user}::${password}`;

    const encryptedText = await this.cryptographyConfig.encrypt({
      key: this.envConfig.USER_DATA_ENCRYPTION_KEY,
      data: combinedText,
    });

    await this.fileConfig.write({
      filename: UserDataStorageFilenamesEnum.UserSession,
      directory: this.fileConfig.userDataDirectory,
      data: encryptedText,
    });

    ipcEvent.reply(IpcEventsEnum.SignIn, { user });
  }
}
