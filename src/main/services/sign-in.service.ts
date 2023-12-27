import { IpcEventsEnum } from '../constants/ipc-events.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  ApiConfig,
  FileConfig,
  SignInServiceDto,
  SignInService as SignInServiceInterface,
} from '../interfaces';

export class SignInService implements SignInServiceInterface {
  constructor(
    private readonly fileConfig: FileConfig,
    private readonly apiConfig: ApiConfig,
  ) {}

  public async execute({
    credentials,
    session,
    ipcEvent,
  }: SignInServiceDto): Promise<void> {
    const { login } = await this.apiConfig.gameLogin({
      accessToken: session.accessToken,
      password: credentials.password,
    });

    const userLoginPromise = this.fileConfig.write({
      filename: UserDataStorageFilenamesEnum.UserLogin,
      directory: this.fileConfig.userDataDirectory,
      data: login,
    });

    const userSessionPromise = this.fileConfig.write({
      filename: UserDataStorageFilenamesEnum.UserSession,
      directory: this.fileConfig.userDataDirectory,
      data: JSON.stringify(session),
    });

    await Promise.all([userLoginPromise, userSessionPromise]);

    ipcEvent.reply(IpcEventsEnum.SignIn);
  }
}
