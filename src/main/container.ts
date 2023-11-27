import { app as electronApp } from 'electron';

import { CryptographyConfig, FileConfig } from './configs';
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
  const fileConfig = new FileConfig();

  const playGameService = new PlayGameService(cryptographyConfig, fileConfig);
  const signInService = new SignInService(cryptographyConfig, fileConfig);
  const downloadGameService = new DownloadGameService(fileConfig);
  const signOutService = new SignOutService(fileConfig);
  const getUserSessionService = new GetUserSessionService(
    cryptographyConfig,
    fileConfig,
  );

  const ipcEventsController = new IpcEventsController(app, {
    getUserSessionService,
    downloadGameService,
    playGameService,
    signOutService,
    signInService,
  });

  return { ipcEventsController };
};
