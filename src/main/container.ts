import { app as electronApp } from 'electron';

import { FileConfig } from './configs';
import { IpcEventsController } from './controllers';
import { DownloadGameService, PlayGameService } from './services';

type ContainerDto = {
  app: typeof electronApp;
};

export const container = ({ app }: ContainerDto) => {
  const fileConfig = new FileConfig();

  const downloadGameService = new DownloadGameService(fileConfig);
  const playGameService = new PlayGameService(fileConfig);

  const ipcEventsController = new IpcEventsController(app, {
    downloadGameService,
    playGameService,
  });

  return { ipcEventsController };
};
