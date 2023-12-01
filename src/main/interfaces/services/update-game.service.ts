import type { IpcMainEvent } from 'electron';

export type UpdateGameServiceDto = {
  ipcEvent: IpcMainEvent;
};

export interface UpdateGameService {
  execute(dto: UpdateGameServiceDto): Promise<void>;
}
