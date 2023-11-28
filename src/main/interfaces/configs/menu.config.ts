import { BrowserWindow } from 'electron';

export type MenuConfigBuildTrayDto = {
  mainWindow: BrowserWindow;
  updateFound?: boolean;
};

export interface MenuConfig {
  buildTray(dto: MenuConfigBuildTrayDto): void;
}
