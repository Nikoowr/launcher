import { USER_DATA_ENCRYPTION_KEY } from '../constants/security.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  CryptographyConfig,
  FileConfig,
  SignInServiceDto,
  SignInService as SignInServiceInterface,
} from '../interfaces';

export class SignInService implements SignInServiceInterface {
  constructor(
    private readonly cryptographyConfig: CryptographyConfig,
    private readonly fileConfig: FileConfig,
  ) {}

  public async execute({ user, password }: SignInServiceDto): Promise<void> {
    const combinedText = `${user}::${password}`;

    const encryptedText = await this.cryptographyConfig.encrypt({
      key: USER_DATA_ENCRYPTION_KEY,
      data: combinedText,
    });

    await this.fileConfig.write({
      filename: UserDataStorageFilenamesEnum.UserSession,
      directory: this.fileConfig.userDataDirectory,
      data: encryptedText,
    });
  }
}
