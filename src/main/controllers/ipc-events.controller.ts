import {
  type BrowserWindow,
  type IpcMainEvent,
  app as electronApp,
} from 'electron';

import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  DownloadGameService,
  IpcEventsController as IpcEventsControllerInterface,
  PlayGameService,
  SignInServiceDto,
} from '../interfaces';
import { SignInService } from '../services';

type ConstructorServices = {
  downloadGameService: DownloadGameService;
  playGameService: PlayGameService;
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
    dto: SignInServiceDto,
  ) => {
    await this.services.signInService.execute(dto);
    event.reply(IpcEventsEnum.SignIn);
  };

  [IpcEventsEnum.UpdateGame] = async (event: Electron.IpcMainEvent) => {
    const gameAlreadyDownloaded = false;

    if (gameAlreadyDownloaded) {
      return;
    }

    await this.services.downloadGameService.execute({
      ipcEvent: event,
    });
  };

  [IpcEventsEnum.Play] = async (event: Electron.IpcMainEvent) => {
    await this.services.playGameService.execute();

    event.reply(IpcEventsEnum.Play);
  };
}
