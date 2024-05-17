import type { IpcMainEvent } from 'electron';

export type DownloadLatestUpdatesServiceDto = {
  ipcEvent: IpcMainEvent;
};

export interface DownloadLatestUpdatesService {
  execute(dto: DownloadLatestUpdatesServiceDto): Promise<void>;
}
