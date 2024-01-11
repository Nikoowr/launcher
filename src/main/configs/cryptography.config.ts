import * as crypto from 'crypto';

import {
  CryptographyConfigDto,
  CryptographyConfig as CryptographyConfigInterface,
} from '../interfaces';

export class CryptographyConfig implements CryptographyConfigInterface {
  private static readonly algorithm = 'aes-256-ctr';

  public async encrypt({ data, key }: CryptographyConfigDto): Promise<string> {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      CryptographyConfig.algorithm,
      Buffer.from(key, 'hex'),
      iv,
    );

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
  }

  public async decrypt({ data, key }: CryptographyConfigDto): Promise<string> {
    const [ivText, encryptedText] = data.split(':');
    const iv = Buffer.from(ivText, 'hex');
    const decipher = crypto.createDecipheriv(
      CryptographyConfig.algorithm,
      Buffer.from(key, 'hex'),
      iv,
    );

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  public async md5(text: string): Promise<string> {
    return crypto.createHash('md5').update(text).digest('hex');
  }
}
