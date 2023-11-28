import { BrowserWindow } from 'electron';

export type AutoUpdaterConfigCheckForUpdatesDto = {
  mainWindow: BrowserWindow;
};

export interface AutoUpdaterConfig {
  checkForUpdates(dto: AutoUpdaterConfigCheckForUpdatesDto): void;
}
