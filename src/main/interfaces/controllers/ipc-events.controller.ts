import type { BrowserWindow, IpcMainEvent } from 'electron';

import { IpcEventsEnum } from '../../constants/ipc-events.constants';

export interface IpcEventsController {
  [IpcEventsEnum.WindowEvent]: (
    event: IpcMainEvent,
    action: 'minimize-tray' | 'close',
    mainWindow: BrowserWindow | null,
  ) => void;
}
