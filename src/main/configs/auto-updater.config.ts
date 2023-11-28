import log from 'electron-log';
import { NsisUpdater } from 'electron-updater';

export class AutoUpdaterConfig {
  constructor() {
    log.transports.file.level = 'debug';

    const autoUpdater = new NsisUpdater({
      url: 'https://gfchaos-launcher.s3.us-east-2.amazonaws.com/prod',
      provider: 'generic',
      channel: 'latest',
    });

    autoUpdater.logger = log;
    autoUpdater.channel = 'latest';

    autoUpdater?.logger?.info(
      `[AppUpdater] - currentVersion: ${autoUpdater.currentVersion}`,
    );

    autoUpdater?.logger?.info(
      `[AppUpdater] - autoDownload: ${autoUpdater.autoDownload}`,
    );

    autoUpdater?.logger?.info(
      `[AppUpdater] - autoInstallOnAppQuit: ${autoUpdater.autoInstallOnAppQuit}`,
    );

    autoUpdater?.logger?.info(
      `[AppUpdater] - autoRunAppAfterInstall: ${autoUpdater.autoRunAppAfterInstall}`,
    );

    autoUpdater?.logger?.info(`[AppUpdater] - channel: ${autoUpdater.channel}`);

    autoUpdater?.logger?.info(
      `[AppUpdater] - fullChangelog: ${autoUpdater.fullChangelog}`,
    );

    autoUpdater?.logger?.info(
      `[AppUpdater] - updateConfigPath: ${autoUpdater.updateConfigPath}`,
    );

    autoUpdater.checkForUpdatesAndNotify().then((results) => {
      autoUpdater?.logger?.info(
        `[AppUpdater] - results: ${JSON.stringify(results)}`,
      );
    });

    autoUpdater.on('update-not-available', () => {
      autoUpdater?.logger?.info('[AppUpdater] - Update not available');
    });

    autoUpdater.on('update-available', () => {
      autoUpdater?.logger?.info('[AppUpdater] - Update available');
    });
  }
}
