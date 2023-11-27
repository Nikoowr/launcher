import type { IpcMainEvent } from 'electron';

export type SignOutServiceDto = {
  ipcEvent: IpcMainEvent;
};

export interface SignOutService {
  execute(dto: SignOutServiceDto): Promise<void>;
}
