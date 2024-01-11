import {
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  Tray,
  app,
} from 'electron';

import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  MenuConfigBuildTrayDto,
  MenuConfig as MenuConfigInterface,
} from '../interfaces';
import { FileConfig } from './file.config';

export class MenuConfig implements MenuConfigInterface {
  private tray?: Tray;

  constructor(private readonly fileConfig: FileConfig) {}

  public buildTray({ mainWindow, updateFound }: MenuConfigBuildTrayDto) {
    this.createTray();

    if (!this.tray) {
      return;
    }

    const menuItems: (MenuItemConstructorOptions | MenuItem)[] = [
      {
        label: 'GF Chaos Launcher',
        click: () => {
          mainWindow.show();
        },
      },
      { type: 'separator' },
      // {
      //   label: 'Logout',
      //   click: () => {
      //     mainWindow.webContents?.send(IpcEventsEnum.SignOut);
      //   },
      // },
      {
        label: 'Fechar',
        click: () => {
          this.tray?.destroy();
          app.quit();
        },
      },
    ];

    if (updateFound) {
      menuItems.push({ type: 'separator' });

      menuItems.push({
        label: 'Reiniciar para finalizar atualização',
        click: () => {
          mainWindow.webContents?.send(IpcEventsEnum.AutoUpdateQuitAndInstall);
        },
      });
    }

    this.tray.setContextMenu(Menu.buildFromTemplate(menuItems));
    this.tray.on('double-click', () => mainWindow.show());
  }

  private createTray() {
    if (this.tray) {
      return;
    }

    this.tray = new Tray(this.fileConfig.getAssetPath('icon.png'));
    this.tray.setToolTip('GF Chaos Launcher');
  }
}
