import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { AES } from 'crypto-js';

import { API_URL, SERVER_IP } from '../../constants/stage.constants';
import { ApiRoutesEnum } from '../constants/api.constants';
import {
  ApiConfigGameLoginDto,
  ApiConfigGameLoginResponse,
  ApiConfig as ApiConfigInterface,
  ApplicationStatus,
  EnvConfig,
  FileConfig,
  StageConfig,
} from '../interfaces';

export class ApiConfig implements ApiConfigInterface {
  private readonly api: AxiosInstance;

  constructor(
    private readonly envConfig: EnvConfig,
    private readonly stageConfig: StageConfig,
    private readonly fileConfig: FileConfig,
  ) {
    this.api = axios.create();

    this.api.interceptors.request.use(async (config) => {
      const baseURL = this.getBaseUrl();

      return {
        ...config,
        baseURL,
        headers: {
          ...config.headers,
          ['x-api-key']: this.apiKey,
          ['x-mac']: this.fileConfig.MAC,
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

    const serverIp = SERVER_IP[this.stageConfig.get()];

    return { ...data, serverIp };
  }

  public async getStatus({
    currentGameVersion,
  }: {
    currentGameVersion: string;
  }): Promise<ApplicationStatus> {
    const { data } = await this.api.get<ApplicationStatus>(
      ApiRoutesEnum.GetAppStatusRoute,
      {
        params: {
          version: currentGameVersion,
        },
      },
    );

    return data;
  }

  public async getDownloadUrl(): Promise<string | null> {
    try {
      const { data } = await this.api.get<{ url?: string }>(
        '/v1/status/game-download-url',
      );

      return data?.url || null;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  private getBaseUrl() {
    const stage = this.stageConfig.get();

    return API_URL[stage];
  }
}
