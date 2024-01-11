import { Status } from '../models/status.model';

export type ApiConfigGameLoginDto = {
  accessToken: string;
  password: string;
};

export type ApiConfigGameLoginResponse = {
  login: string;
};

export interface ApiConfig {
  gameLogin(dto: ApiConfigGameLoginDto): Promise<ApiConfigGameLoginResponse>;

  getStatus(): Promise<Status>;
}
