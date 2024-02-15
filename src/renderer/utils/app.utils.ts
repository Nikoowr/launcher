import { IpcEventsEnum } from '../../main/constants/ipc-events.constants';

const { ipcRenderer } = window.electron;

export const reload = (): Promise<void> => {
  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.ReloadApp, resolve);
    ipcRenderer.sendMessage(IpcEventsEnum.ReloadApp);
  });
};
