import { app as electronApp } from 'electron';

import { CryptographyConfig, FileConfig } from './configs';
import { IpcEventsController } from './controllers';
import {
  DownloadGameService,
  PlayGameService,
  SignInService,
} from './services';

type ContainerDto = {
  app: typeof electronApp;
};

export const container = ({ app }: ContainerDto) => {
  const cryptographyConfig = new CryptographyConfig();
  const fileConfig = new FileConfig();

  const downloadGameService = new DownloadGameService(fileConfig);
  const signInService = new SignInService(cryptographyConfig, fileConfig);
  const playGameService = new PlayGameService(cryptographyConfig, fileConfig);

  const ipcEventsController = new IpcEventsController(app, {
    downloadGameService,
    playGameService,
    signInService,
  });

  return { ipcEventsController };
};
