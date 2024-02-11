import type { BrowserWindow, IpcMainEvent } from 'electron';

import { LangsEnum } from '../../../constants/locale.constants';
import { IpcEventsEnum } from '../../constants/ipc-events.constants';
import { CreateGameLoginServiceDto } from '../services/create-game-login.service';
import { PlayGameServiceDto } from '../services/play-game.service';
import { SaveUserSessionServiceDto } from '../services/save-user-session.service';

export interface IpcEventsController {
  [IpcEventsEnum.SaveUserSession]: (
    event: IpcMainEvent,
    dto: SaveUserSessionServiceDto,
  ) => void;

  [IpcEventsEnum.CreateGameLogin]: (
    event: IpcMainEvent,
    dto: CreateGameLoginServiceDto,
  ) => void;

  [IpcEventsEnum.WindowEvent]: (
    event: IpcMainEvent,
    action: 'minimize-tray' | 'close',
    mainWindow: BrowserWindow | null,
  ) => void;

  [IpcEventsEnum.SignOut]: (event: IpcMainEvent) => void;

  [IpcEventsEnum.DownloadGame]: (
    event: IpcMainEvent,
    mainWindow: BrowserWindow | null,
  ) => void;

  [IpcEventsEnum.UpdateGame]: (
    event: IpcMainEvent,
    mainWindow: BrowserWindow | null,
  ) => void;

  [IpcEventsEnum.Play]: (event: IpcMainEvent, dto: PlayGameServiceDto) => void;

  [IpcEventsEnum.GetUserSession]: (event: IpcMainEvent) => void;

  [IpcEventsEnum.GetAppInfo]: (event: IpcMainEvent) => void;

  [IpcEventsEnum.ChangeGameLang]: (event: IpcMainEvent, dto: LangsEnum) => void;

  [IpcEventsEnum.GetGameLang]: (event: IpcMainEvent) => void;
}
