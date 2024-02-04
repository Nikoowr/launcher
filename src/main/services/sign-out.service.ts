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
    const userSessionPromise = this.fileConfig.delete({
      filename: UserDataStorageFilenamesEnum.UserSession,
      directory: this.fileConfig.gameDirectory,
    });

    const userLoginPromise = this.fileConfig.delete({
      filename: UserDataStorageFilenamesEnum.UserLogin,
      directory: this.fileConfig.gameDirectory,
    });

    await Promise.all([userSessionPromise, userLoginPromise]);

    ipcEvent.reply(IpcEventsEnum.SignOut);
  }
}
