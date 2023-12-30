import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  ApiConfig,
  CreateGameLoginServiceDto,
  CreateGameLoginService as CreateGameLoginServiceInterface,
  FileConfig,
} from '../interfaces';

export class CreateGameLoginService implements CreateGameLoginServiceInterface {
  constructor(
    private readonly fileConfig: FileConfig,
    private readonly apiConfig: ApiConfig,
  ) {}

  public async execute({
    credentials,
    session,
  }: CreateGameLoginServiceDto): Promise<void> {
    const { login } = await this.apiConfig.gameLogin({
      accessToken: session.accessToken,
      password: credentials.password,
    });

    await this.fileConfig.write({
      filename: UserDataStorageFilenamesEnum.UserLogin,
      directory: this.fileConfig.userDataDirectory,
      data: login,
    });
  }
}
