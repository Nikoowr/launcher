import { GameFilesEnum } from '../constants/game.constants';
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
    const { login, serverIp } = await this.apiConfig.gameLogin({
      accessToken: session.accessToken,
      password: credentials.password,
    });

    await Promise.all([
      this.createLoginFile({ login }),
      this.createConnectionFiles({ serverIp }),
    ]);
  }

  private async createLoginFile({ login }: { login: string }) {
    await this.fileConfig.write({
      filename: UserDataStorageFilenamesEnum.UserLogin,
      directory: this.fileConfig.gameDirectory,
      data: login,
    });
  }

  private async createConnectionFiles({ serverIp }: { serverIp: string }) {
    const connects = [
      `Stream01=${serverIp},6543`,
      `Stream02=${serverIp},6544`,
      `Stream03=${serverIp},6545`,
      `Stream04=${serverIp},6546`,
    ].join('\n');

    const connect = `Server=${serverIp},6543`;

    await Promise.all([
      this.fileConfig.write({
        directory: this.fileConfig.gameDirectory,
        filename: GameFilesEnum.Connects,
        data: connects,
      }),
      this.fileConfig.write({
        directory: this.fileConfig.gameDirectory,
        filename: GameFilesEnum.Connect,
        data: connect,
      }),
    ]);
  }
}
