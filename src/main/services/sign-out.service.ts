import { IpcEventsEnum } from '../constants/ipc-events.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  FileConfig,
  SignOutServiceDto,
  SignOutService as SignOutServiceInterface,
} from '../interfaces';

export class SignOutService implements SignOutServiceInterface {
  constructor(private readonly fileConfig: FileConfig) {}

  public async execute({ ipcEvent }: SignOutServiceDto): Promise<void> {
    const adminConfigPromise = this.fileConfig.delete({
      filename: UserDataStorageFilenamesEnum.AdminConfig,
      directory: this.fileConfig.adminConfigDirectory,
    });

    const userSessionPromise = this.fileConfig.delete({
      filename: UserDataStorageFilenamesEnum.UserSession,
      directory: this.fileConfig.gameDirectory,
    });

    const userLoginPromise = this.fileConfig.delete({
      filename: UserDataStorageFilenamesEnum.UserLogin,
      directory: this.fileConfig.gameDirectory,
    });

    await Promise.all([
      adminConfigPromise,
      userSessionPromise,
      userLoginPromise,
    ]);

    ipcEvent.reply(IpcEventsEnum.SignOut);
  }
}
