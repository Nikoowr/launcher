import axios, { AxiosInstance } from 'axios';

import {
  EnvConfig,
  GameUpdaterConfigCheckForUpdatesResponse,
  GameUpdaterConfigGetGameDataFileListResponse,
  GameUpdaterConfig as GameUpdaterConfigInterface,
  StageConfig,
} from '../interfaces';

export class GameUpdaterConfig implements GameUpdaterConfigInterface {
  private readonly api: AxiosInstance;

  constructor(
    private readonly envConfig: EnvConfig,
    private readonly stageConfig: StageConfig,
  ) {
    this.api = axios.create();

    this.api.interceptors.request.use(async (config) => {
      Object.assign(config, {
        baseURL: this.getBaseUrl(),
      });

      return config;
    });
  }

  public async getPatchInfo(): Promise<GameUpdaterConfigCheckForUpdatesResponse | null> {
    try {
      const { data } = await this.api.get('/latest.json');

      if (!data) {
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  public async getGameDataFileList({
    version,
  }: {
    version: string;
  }): Promise<GameUpdaterConfigGetGameDataFileListResponse | null> {
    try {
      const { data } = await this.api.get(`/${version}/GameDataFileList.txt`);

      if (!data) {
        return null;
      }

      const [totalFilesChanged, createdAt, ...fileChanges] = data
        .split('\n')
        .map((line: string) => line.trim().replace('\t', ' '))
        .filter(Boolean);

      return { fileChanges, createdAt, totalFilesChanged };
    } catch {
      return null;
    }
  }

  private getBaseUrl() {
    const stage = this.stageConfig.get();

    return `${this.envConfig.GAME_UPDATER_URL}${stage}`;
  }
}
