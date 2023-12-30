import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  FileConfig,
  SaveUserSessionServiceDto,
  SaveUserSessionService as SaveUserSessionServiceInterface,
} from '../interfaces';

export class SaveUserSessionService implements SaveUserSessionServiceInterface {
  constructor(private readonly fileConfig: FileConfig) {}

  public async execute({ session }: SaveUserSessionServiceDto): Promise<void> {
    await this.fileConfig.write({
      filename: UserDataStorageFilenamesEnum.UserSession,
      directory: this.fileConfig.userDataDirectory,
      data: JSON.stringify(session),
    });
  }
}
