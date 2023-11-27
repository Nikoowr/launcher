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
    await this.fileConfig.delete({
      filename: UserDataStorageFilenamesEnum.UserSession,
      directory: this.fileConfig.userDataDirectory,
    });

    ipcEvent.reply(IpcEventsEnum.SignOut);
  }
}
