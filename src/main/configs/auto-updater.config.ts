import { BrowserWindow, Notification } from 'electron';
import log from 'electron-log';
import { NsisUpdater } from 'electron-updater';

import {
  AutoUpdaterConfigCheckForUpdatesDto,
  AutoUpdaterConfig as AutoUpdaterConfigInterface,
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

  constructor() {
    log.transports.file.level = 'debug';

    this.autoUpdater = new NsisUpdater({
      url: 'https://gfchaos-launcher.s3.us-east-2.amazonaws.com/prod',
      provider: 'generic',
      channel: 'latest',
    });

    this.autoUpdater.logger = log;
    this.autoUpdater.channel = 'latest';
  }

  public checkForUpdates({
    mainWindow,
  }: AutoUpdaterConfigCheckForUpdatesDto): void {
    this.autoUpdater?.logger?.info(
      `[AppUpdater] - currentVersion: ${this.autoUpdater.currentVersion}`,
    );

    this.autoUpdater?.logger?.info(
      `[AppUpdater] - autoDownload: ${this.autoUpdater.autoDownload}`,
    );

    this.autoUpdater?.logger?.info(
      `[AppUpdater] - autoInstallOnAppQuit: ${this.autoUpdater.autoInstallOnAppQuit}`,
    );

    this.autoUpdater?.logger?.info(
      `[AppUpdater] - autoRunAppAfterInstall: ${this.autoUpdater.autoRunAppAfterInstall}`,
    );

    this.autoUpdater?.logger?.info(
      `[AppUpdater] - channel: ${this.autoUpdater.channel}`,
    );

    this.autoUpdater?.logger?.info(
      `[AppUpdater] - fullChangelog: ${this.autoUpdater.fullChangelog}`,
    );

    this.autoUpdater?.logger?.info(
      `[AppUpdater] - updateConfigPath: ${this.autoUpdater.updateConfigPath}`,
    );

    this.autoUpdater.checkForUpdatesAndNotify().then((results) => {
      this.autoUpdater?.logger?.info(
        `[AppUpdater] - results: ${JSON.stringify(results)}`,
      );
    });

    this.autoUpdater.on(EventsEnum.UpdateNotAvailable, () => {
      this.autoUpdater?.logger?.info('[AppUpdater] - Update not available');
      this.waitCheckForUpdates();
    });

    this.autoUpdater.on(EventsEnum.CheckingForUpdate, () => {
      this.autoUpdater?.logger?.info('[AppUpdater] - Checking for update');
    });

    this.autoUpdater.on(EventsEnum.DownloadProgress, () => {
      this.autoUpdater?.logger?.info('[AppUpdater] - Download progress');
    });

    this.autoUpdater.on(EventsEnum.UpdateDownloaded, () => {
      this.autoUpdater?.logger?.info('[AppUpdater] - Update downloaded');
      this.notification({ mainWindow }).show();

      this.waitCheckForUpdates();
    });

    this.autoUpdater.on(EventsEnum.UpdateAvailable, () => {
      this.autoUpdater?.logger?.info('[AppUpdater] - Update available');
    });

    this.autoUpdater.on(EventsEnum.Error, () => {
      this.autoUpdater?.logger?.info('[AppUpdater] - Error');
    });
  }

  private waitCheckForUpdates() {
    setTimeout(() => {
      this.autoUpdater.checkForUpdates();
    }, 10000);
  }

  private notification({ mainWindow }: { mainWindow: BrowserWindow }) {
    return new Notification({
      title: 'Nova versão disponível',
      body: 'Por favor, feche o Atendente Virtual e abra novamente para finalizar a atualização!',
    }).on('click', () => {
      mainWindow?.show();
    });
  }
}
