import type { BrowserWindow, IpcMainEvent } from 'electron';

import { IpcEventsEnum } from '../../constants/ipc-events.constants';
import { SignInServiceDto } from '../services/sign-in.service';

export interface IpcEventsController {
  [IpcEventsEnum.WindowEvent]: (
    event: IpcMainEvent,
    action: 'minimize-tray' | 'close',
    mainWindow: BrowserWindow | null,
  ) => void;

  [IpcEventsEnum.SignIn]: (event: IpcMainEvent, dto: SignInServiceDto) => void;

  [IpcEventsEnum.UpdateGame]: (
    event: IpcMainEvent,
    mainWindow: BrowserWindow | null,
  ) => void;
}
