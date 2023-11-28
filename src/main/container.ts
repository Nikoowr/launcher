import { app as electronApp } from 'electron';

import {
  AutoUpdaterConfig,
  CryptographyConfig,
  FileConfig,
  MenuConfig,
  envConfig,
} from './configs';
import { IpcEventsController } from './controllers';
import {
  DownloadGameService,
  GetUserSessionService,
  PlayGameService,
  SignInService,
  SignOutService,
} from './services';

type ContainerDto = {
  app: typeof electronApp;
};

export const container = ({ app }: ContainerDto) => {
  const cryptographyConfig = new CryptographyConfig();
  const fileConfig = new FileConfig(envConfig);
  const menuConfig = new MenuConfig(fileConfig);
  const autoUpdaterConfig = new AutoUpdaterConfig(
    fileConfig,
    menuConfig,
    envConfig,
  );

  const playGameService = new PlayGameService(
    cryptographyConfig,
    fileConfig,
    envConfig,
  );
  const signInService = new SignInService(
    cryptographyConfig,
    fileConfig,
    envConfig,
  );
  const downloadGameService = new DownloadGameService(fileConfig, envConfig);
  const signOutService = new SignOutService(fileConfig);
  const getUserSessionService = new GetUserSessionService(
    cryptographyConfig,
    fileConfig,
    envConfig,
  );

  const ipcEventsController = new IpcEventsController(app, {
    getUserSessionService,
    downloadGameService,
    playGameService,
    signOutService,
    signInService,
  });

  return { ipcEventsController, autoUpdaterConfig, menuConfig };
};
