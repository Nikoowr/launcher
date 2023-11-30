import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';

import { IpcEventsEnum } from './constants/ipc-events.constants';

export type Channels = IpcEventsEnum;

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(channel: Channels, func: (...args: any[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    once(channel: Channels, func: (...args: any[]) => void) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ipcRenderer.once(channel, (_event: any, ...args: any) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
