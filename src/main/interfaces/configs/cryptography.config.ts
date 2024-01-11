export interface CryptographyConfigDto {
  data: string;
  key: string;
}

export interface CryptographyConfig {
  encrypt(dto: CryptographyConfigDto): Promise<string>;

  decrypt(dto: CryptographyConfigDto): Promise<string>;

  md5(text: string): Promise<string>;
}
