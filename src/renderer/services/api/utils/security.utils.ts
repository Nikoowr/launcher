import { AES } from 'crypto-js';

export class SecurityUtils {
  public generateApiKey() {
    const encryptedAuthText = AES.encrypt(
      process.env.API_KEY_TEXT as string,
      process.env.API_KEY_TEXT_SALT as string,
    );
    const encryptedDate = AES.encrypt(
      new Date().toISOString(),
      process.env.API_KEY_DATE_SALT as string,
    );

    return `${encryptedAuthText}::${encryptedDate}`;
  }
}
