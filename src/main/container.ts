import { app as electronApp } from 'electron';

import { IpcEventsController } from './controllers/ipc-events.controller';

type ContainerDto = {
  app: typeof electronApp;
};

export const container = ({ app }: ContainerDto) => {
  const ipcEventsController = new IpcEventsController(app);

  return { ipcEventsController };
};
