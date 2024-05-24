import type { IpcMainEvent } from 'electron';

export type CheckForUpdatesServiceDto = {
  ipcEvent: IpcMainEvent;
};

export interface CheckForUpdatesService {
  execute(dto: CheckForUpdatesServiceDto): Promise<void>;
}
