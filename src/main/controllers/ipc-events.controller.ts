import {
  type BrowserWindow,
  type IpcMainEvent,
  app as electronApp,
} from 'electron';

import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  DownloadGameService,
  IpcEventsController as IpcEventsControllerInterface,
  SignInServiceDto,
} from '../interfaces';

type ConstructorServices = {
  downloadGameService: DownloadGameService;
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

  [IpcEventsEnum.SignIn] = (
    event: Electron.IpcMainEvent,
    dto: SignInServiceDto,
  ) => {
    console.log('dto', dto);
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

  [IpcEventsEnum.Play] = (event: Electron.IpcMainEvent) => {
    console.log(event);
  };
}
