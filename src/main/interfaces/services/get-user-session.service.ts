import type { IpcMainEvent } from 'electron';

export type GetUserSessionServiceDto = {
  ipcEvent: IpcMainEvent;
};

export interface GetUserSessionService {
  execute(dto: GetUserSessionServiceDto): Promise<void>;
}
