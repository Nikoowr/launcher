import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { AES } from 'crypto-js';

import { API_URL } from '../../constants/stage.constants';
import { ApiRoutesEnum } from '../constants/api.constants';
import {
  ApiConfigGameLoginDto,
  ApiConfigGameLoginResponse,
  ApiConfig as ApiConfigInterface,
  EnvConfig,
  StageConfig,
  Status,
} from '../interfaces';

export class ApiConfig implements ApiConfigInterface {
  private readonly api: AxiosInstance;

  constructor(
    private readonly envConfig: EnvConfig,
    private readonly stageConfig: StageConfig,
  ) {
    this.api = axios.create();

    this.api.interceptors.request.use(async (config) => {
      const baseURL = await this.getBaseUrl();

      return {
        ...config,
        baseURL,
        headers: {
          ...config.headers,
          ['x-api-key']: this.apiKey,
        },
      } as unknown as InternalAxiosRequestConfig;
    });
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

  public async getStatus(): Promise<Status> {
    const { data } = await this.api.get<Status>(
      ApiRoutesEnum.GetAppStatusRoute,
    );

    return data;
  }

  private async getBaseUrl() {
    const stage = await this.stageConfig.get();

    return API_URL[stage];
  }
}
