import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';

import { IpcEventsEnum } from './constants/ipc.constants';

export type Channels = IpcEventsEnum;

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },

    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },

    once(channel: Channels, func: (...args: unknown[]) => void) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ipcRenderer.once(channel, (_event: any, ...args: any) => func(...args));
    },

    windowEvent(action: 'close' | 'minimize-tray') {
      ipcRenderer.send(IpcEventsEnum.WindowEvent, action);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
