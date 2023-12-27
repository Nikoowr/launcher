import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { AES } from 'crypto-js';

import { ApiRoutesEnum } from '../constants/api.constants';
import {
  ApiConfigGameLoginDto,
  ApiConfigGameLoginResponse,
  ApiConfig as ApiConfigInterface,
  EnvConfig,
} from '../interfaces';

export class ApiConfig implements ApiConfigInterface {
  private readonly api: AxiosInstance;

  constructor(private readonly envConfig: EnvConfig) {
    this.api = axios.create({
      baseURL: this.envConfig.API_URL,
    });

    this.api.interceptors.request.use(
      (config) =>
        ({
          ...config,
          headers: {
            ...config.headers,
            ['x-api-key']: this.apiKey,
          },
        } as unknown as InternalAxiosRequestConfig),
    );
  }

  private get apiKey() {
    const encryptedAuthText = AES.encrypt(
      this.envConfig.API_KEY_TEXT,
      this.envConfig.API_KEY_TEXT_SALT,
    );
    const encryptedDate = AES.encrypt(
      new Date().toISOString(),
      this.envConfig.API_KEY_DATE_SALT,
    );

    return `${encryptedAuthText}::${encryptedDate}`;
  }

  public async gameLogin({
    accessToken,
    password,
  }: ApiConfigGameLoginDto): Promise<ApiConfigGameLoginResponse> {
    const { data } = await this.api.post<ApiConfigGameLoginResponse>(
      ApiRoutesEnum.GameLoginRoute,
      { password },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }
}
