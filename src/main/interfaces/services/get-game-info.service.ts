import type { IpcMainEvent } from 'electron';

export type GetGameInfoServiceDto = {
  ipcEvent: IpcMainEvent;
};

export interface GetGameInfoService {
  execute(dto: GetGameInfoServiceDto): Promise<void>;
}
