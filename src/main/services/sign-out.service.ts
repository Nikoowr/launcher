import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  FileConfig,
  SignOutService as SignOutServiceInterface,
} from '../interfaces';

export class SignOutService implements SignOutServiceInterface {
  constructor(private readonly fileConfig: FileConfig) {}

  public async execute(): Promise<void> {
    await this.fileConfig.delete({
      filename: UserDataStorageFilenamesEnum.UserSession,
      directory: this.fileConfig.userDataDirectory,
    });
  }
}
