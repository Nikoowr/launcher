import {
  FileConfig,
  PlayGameService as PlayGameServiceInterface,
} from '../interfaces';

export class PlayGameService implements PlayGameServiceInterface {
  constructor(private readonly fileConfig: FileConfig) {}

  public async execute(): Promise<void> {
    await this.fileConfig.openExecutable({
      props: ['EasyFun', '-a mosquito', '-p mosquito'],
      directory: this.fileConfig.gameDirectory(),
      executable: 'GrandFantasia.exe',
    });
  }
}
