import { GameFilesEnum } from '../constants/game.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  ApiConfig,
  CreateGameLoginServiceDto,
  CreateGameLoginService as CreateGameLoginServiceInterface,
  EnvConfig,
  FileConfig,
} from '../interfaces';

export class CreateGameLoginService implements CreateGameLoginServiceInterface {
  constructor(
    private readonly fileConfig: FileConfig,
    private readonly apiConfig: ApiConfig,
    private readonly envConfig: EnvConfig,
  ) {}

  public async execute({
    credentials,
    session,
  }: CreateGameLoginServiceDto): Promise<void> {
    const { login } = await this.apiConfig.gameLogin({
      accessToken: session.accessToken,
      password: credentials.password,
    });

    await Promise.all([
      this.createLoginFile({ login }),
      this.createConnectionFiles(),
    ]);
  }

  private async createLoginFile({ login }: { login: string }) {
    await this.fileConfig.write({
      filename: UserDataStorageFilenamesEnum.UserLogin,
      directory: this.fileConfig.gameDirectory,
      data: login,
    });
  }

  private async createConnectionFiles() {
    const connects = [
      `Stream01=${this.envConfig.GAME_SERVER_IP},6543`,
      `Stream02=${this.envConfig.GAME_SERVER_IP},6544`,
      `Stream03=${this.envConfig.GAME_SERVER_IP},6545`,
      `Stream04=${this.envConfig.GAME_SERVER_IP},6546`,
    ].join('\n');

    const connect = `Server=${this.envConfig.GAME_SERVER_IP},6543`;

    await Promise.all([
      this.fileConfig.write({
        filename: GameFilesEnum.Connects,
        directory: this.fileConfig.gameDirectory,
        data: connects,
      }),
      this.fileConfig.write({
        filename: GameFilesEnum.Connect,
        directory: this.fileConfig.gameDirectory,
        data: connect,
      }),
    ]);
  }
}
