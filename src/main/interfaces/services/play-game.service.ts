import type { IpcMainEvent } from 'electron';

export type PlayGameServiceDto = {
  ipcEvent: IpcMainEvent;
};

export interface PlayGameService {
  execute(dto: PlayGameServiceDto): Promise<void>;
}
