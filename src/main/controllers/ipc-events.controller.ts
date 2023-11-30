import {
  type BrowserWindow,
  type IpcMainEvent,
  app as electronApp,
} from 'electron';

import { GameUpdateStatusEnum } from '../constants/game.constants';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  DownloadGameService,
  GetUserSessionService,
  IpcEventsController as IpcEventsControllerInterface,
  PlayGameService,
  SignOutService,
} from '../interfaces';
import { SignInService } from '../services';

type ConstructorServices = {
  getUserSessionService: GetUserSessionService;
  downloadGameService: DownloadGameService;
  playGameService: PlayGameService;
  signOutService: SignOutService;
  signInService: SignInService;
};

export class IpcEventsController implements IpcEventsControllerInterface {
  constructor(
    private readonly app: typeof electronApp,
    private readonly services: ConstructorServices,
  ) {}

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

  [IpcEventsEnum.SignIn] = async (
    event: Electron.IpcMainEvent,
    credentials: { user: string; password: string },
  ) => {
    await this.services.signInService.execute({
      ...credentials,
      ipcEvent: event,
    });
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
    const checks = Array.from({ length: 30 });

    // Checking
    for (const [index] of checks.entries()) {
      event.reply(IpcEventsEnum.UpdateGame, {
        status: GameUpdateStatusEnum.Checking,
        progress: ((index + 1) / checks.length) * 100,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Downloading
    for (const [index] of checks.entries()) {
      event.reply(IpcEventsEnum.UpdateGame, {
        status: GameUpdateStatusEnum.Downloading,
        progress: ((index + 1) / checks.length) * 100,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Updating
    for (const [index] of checks.entries()) {
      event.reply(IpcEventsEnum.UpdateGame, {
        status: GameUpdateStatusEnum.Updating,
        progress: ((index + 1) / checks.length) * 100,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    event.reply(IpcEventsEnum.UpdateGame, {
      status: GameUpdateStatusEnum.Done,
      progress: 100,
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
}
