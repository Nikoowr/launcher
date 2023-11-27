import type { IpcMainEvent } from 'electron';

export type SignInServiceDto = {
  ipcEvent: IpcMainEvent;
  password: string;
  user: string;
};

export interface SignInService {
  execute(dto: SignInServiceDto): Promise<void>;
}
