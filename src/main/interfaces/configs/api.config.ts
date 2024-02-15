import { ApplicationStatus } from '../models/status.model';

export type ApiConfigGameLoginDto = {
  accessToken: string;
  password: string;
};

export type ApiConfigGameLoginResponse = {
  serverIp: string;
  login: string;
};

export interface ApiConfig {
  gameLogin(dto: ApiConfigGameLoginDto): Promise<ApiConfigGameLoginResponse>;

  getStatus(dto: { currentGameVersion: string }): Promise<ApplicationStatus>;

  getDownloadUrl(): Promise<string | null>;
}
