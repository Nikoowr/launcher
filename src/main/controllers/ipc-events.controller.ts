import {
  type BrowserWindow,
  type IpcMainEvent,
  app as electronApp,
} from 'electron';

import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  CreateGameLoginService,
  CreateGameLoginServiceDto,
  DownloadGameService,
  GetGameInfoService,
  GetUserSessionService,
  IpcEventsController as IpcEventsControllerInterface,
  PlayGameService,
  SaveUserSessionService,
  SaveUserSessionServiceDto,
  SignOutService,
  UpdateGameService,
} from '../interfaces';

type ConstructorServices = {
  createGameLoginService: CreateGameLoginService;
  saveUserSessionService: SaveUserSessionService;
  getUserSessionService: GetUserSessionService;
  downloadGameService: DownloadGameService;
  getGameInfoService: GetGameInfoService;
  updateGameService: UpdateGameService;
  playGameService: PlayGameService;
  signOutService: SignOutService;
};

export class IpcEventsController implements IpcEventsControllerInterface {
  constructor(
    private readonly app: typeof electronApp,
    private readonly services: ConstructorServices,
  ) {}

  public async [IpcEventsEnum.SaveUserSession](
    event: Electron.IpcMainEvent,
    dto: SaveUserSessionServiceDto,
  ) {
    await this.services.saveUserSessionService.execute(dto);
    event.reply(IpcEventsEnum.SaveUserSession);
  }

  public async [IpcEventsEnum.CreateGameLogin](
    event: Electron.IpcMainEvent,
    dto: CreateGameLoginServiceDto,
  ) {
    await this.services.createGameLoginService.execute(dto);
    event.reply(IpcEventsEnum.CreateGameLogin);
  }

  [IpcEventsEnum.WindowEvent] = (
    event: IpcMainEvent,
    action: 'minimize-tray' | 'close',
    mainWindow: BrowserWindow | null,
  ) => {
    if (action === 'minimize-tray') {
      mainWindow?.hide();
    }

    if (action === 'close') {
      mainWindow?.close();
      this.app.quit();
    }

    event.reply(IpcEventsEnum.WindowEvent);
  };

  [IpcEventsEnum.SignOut] = async (event: Electron.IpcMainEvent) => {
    await this.services.signOutService.execute({ ipcEvent: event });
  };

  [IpcEventsEnum.DownloadGame] = async (event: Electron.IpcMainEvent) => {
    await this.services.downloadGameService.execute({
      ipcEvent: event,
    });
  };

  [IpcEventsEnum.UpdateGame] = async (event: Electron.IpcMainEvent) => {
    await this.services.updateGameService.execute({
      ipcEvent: event,
    });
  };

  [IpcEventsEnum.Play] = async (event: Electron.IpcMainEvent) => {
    await this.services.playGameService.execute({ ipcEvent: event });
  };

  [IpcEventsEnum.GetUserSession] = async (event: Electron.IpcMainEvent) => {
    await this.services.getUserSessionService.execute({ ipcEvent: event });
  };

  [IpcEventsEnum.GetAppInfo] = async (event: Electron.IpcMainEvent) => {
    event.reply(IpcEventsEnum.GetAppInfo, {
      version: this.app.getVersion(),
    });
  };

  [IpcEventsEnum.GetGameInfo] = async (event: Electron.IpcMainEvent) => {
    await this.services.getGameInfoService.execute({ ipcEvent: event });
  };
}
