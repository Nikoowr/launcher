import { BrowserWindow, Notification } from 'electron';
import { NsisUpdater } from 'electron-updater';

import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  AutoUpdaterConfigCheckForUpdatesDto,
  AutoUpdaterConfig as AutoUpdaterConfigInterface,
  EnvConfig,
  FileConfig,
  MenuConfig,
} from '../interfaces';

enum EventsEnum {
  UpdateNotAvailable = 'update-not-available',
  CheckingForUpdate = 'checking-for-update',
  DownloadProgress = 'download-progress',
  UpdateDownloaded = 'update-downloaded',
  UpdateAvailable = 'update-available',
  Error = 'error',
}

export class AutoUpdaterConfig implements AutoUpdaterConfigInterface {
  private readonly autoUpdater: NsisUpdater;

  constructor(
    private readonly fileConfig: FileConfig,
    private readonly menuConfig: MenuConfig,
    private readonly envConfig: EnvConfig,
  ) {
    this.autoUpdater = new NsisUpdater({
      url: `${this.envConfig.AUTO_UPDATER_URL}${this.envConfig.STAGE}`,
      channel: this.envConfig.AUTO_UPDATER_CHANNEL,
      provider: 'generic',
    });
  }

  public checkForUpdates({
    mainWindow,
  }: AutoUpdaterConfigCheckForUpdatesDto): void {
    this.autoUpdater?.logger?.info(
      `[AppUpdater] - currentVersion: ${this.autoUpdater.currentVersion}`,
    );

    this.autoUpdater.checkForUpdates();

    this.autoUpdater.on(EventsEnum.UpdateAvailable, () => {
      this.autoUpdater?.logger?.info('[AppUpdater] - Update available');
    });

    this.autoUpdater.on(EventsEnum.UpdateNotAvailable, () => {
      this.autoUpdater?.logger?.info('[AppUpdater] - Update not available');
      this.waitCheckForUpdates();
    });

    this.autoUpdater.on(EventsEnum.CheckingForUpdate, () => {
      this.autoUpdater?.logger?.info('[AppUpdater] - Checking for update');
    });

    this.autoUpdater.on(EventsEnum.DownloadProgress, (info) => {
      this.autoUpdater?.logger?.info(
        `[AppUpdater] - Download progress: ${info.percent}`,
      );
    });

    this.autoUpdater.on(EventsEnum.UpdateDownloaded, () => {
      this.autoUpdater?.logger?.info('[AppUpdater] - Update downloaded');

      this.menuConfig.buildTray({ updateFound: true, mainWindow });
      mainWindow?.webContents?.send(IpcEventsEnum.AutoUpdaterFoundUpdate);

      this.notification({ mainWindow }).show();

      this.waitCheckForUpdates();
    });

    this.autoUpdater.on(EventsEnum.Error, () => {
      this.autoUpdater?.logger?.info('[AppUpdater] - Error');
    });
  }

  public quitAndInstall(): void {
    this.autoUpdater.quitAndInstall();
  }

  private waitCheckForUpdates() {
    setTimeout(() => {
      this.autoUpdater.checkForUpdates();
    }, 10000);
  }

  private notification({ mainWindow }: { mainWindow: BrowserWindow }) {
    return new Notification({
      title: 'Nova versão do Launcher disponível!',
      icon: this.fileConfig.getAssetPath('icon.png'),
    }).on('click', () => {
      mainWindow?.show();
    });
  }
}
