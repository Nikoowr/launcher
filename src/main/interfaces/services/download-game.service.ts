import type { IpcMainEvent } from 'electron';

export type DownloadGameServiceDto = {
  ipcEvent: IpcMainEvent;
};

export interface DownloadGameService {
  execute(dto: DownloadGameServiceDto): Promise<void>;
}
