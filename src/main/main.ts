import path from 'path';

import { BrowserWindow, app, ipcMain, shell } from 'electron';

import { IpcEventsEnum } from './constants/ipc-events.constants';
import { container } from './container';
import { MenuBuilder } from './menu';
import { envSetup, installExtensions, resolveHtmlPath } from './utils';

envSetup();

const { ipcEventsController, autoUpdaterConfig } = container({ app });
let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  await installExtensions();

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    minWidth: 1024,
    minHeight: 728,
    icon: getAssetPath('icon.png'),
    frame: false,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);

    return { action: 'deny' };
  });

  autoUpdaterConfig.checkForUpdates({ mainWindow });
};

app
  .whenReady()
  .then(() => {
    createWindow();

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // Dock icon is clicked and there are no other windows open.
      if (mainWindow === null) {
        createWindow();
      }
    });
  })
  .catch(console.log);

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // After all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * Add event listeners...
 */

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on(IpcEventsEnum.WindowEvent, async (event, action) =>
  ipcEventsController?.[IpcEventsEnum.WindowEvent](event, action, mainWindow),
);

ipcMain.on(IpcEventsEnum.SignIn, async (event, dto) =>
  ipcEventsController?.[IpcEventsEnum.SignIn](event, dto),
);

ipcMain.on(IpcEventsEnum.SignOut, async (event) =>
  ipcEventsController?.[IpcEventsEnum.SignOut](event),
);

ipcMain.on(IpcEventsEnum.UpdateGame, async (event) =>
  ipcEventsController?.[IpcEventsEnum.UpdateGame](event),
);

ipcMain.on(IpcEventsEnum.Play, async (event) =>
  ipcEventsController?.[IpcEventsEnum.Play](event),
);

ipcMain.on(IpcEventsEnum.GetUserSession, async (event) =>
  ipcEventsController?.[IpcEventsEnum.GetUserSession](event),
);
