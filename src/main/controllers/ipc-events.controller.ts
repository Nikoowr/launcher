import child from 'node:child_process';

import {
  type BrowserWindow,
  type IpcMainEvent,
  app as electronApp,
} from 'electron';

import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  IpcEventsController as IpcEventsControllerInterface,
  SignInServiceDto,
} from '../interfaces';

export class IpcEventsController implements IpcEventsControllerInterface {
  constructor(private readonly app: typeof electronApp) {}

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

  [IpcEventsEnum.Play] = (event: Electron.IpcMainEvent) => {
    const executablePath =
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
    const parameters = ['EasyFun', '-a mosquito', '-p mosquito'];

    child.execFile(executablePath, parameters, function (err, data) {
      console.log(err);
      console.log(data.toString());
    });
  };
}
