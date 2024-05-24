import { IpcEventsEnum } from '../../../main/constants/ipc-events.constants';
import { Updates } from '../../../main/interfaces';

const { ipcRenderer } = window.electron;

const DEFAULT_UPDATE_OBJECT: Updates = {
  client: false,
};

export const checkForUpdates = async (): Promise<Updates> => {
  return new Promise((resolve) => {
    ipcRenderer.once(
      IpcEventsEnum.CheckForUpdates,
      (updates: Updates | null) => {
        if (updates) {
          return resolve(updates);
        }

        return resolve(DEFAULT_UPDATE_OBJECT);
      },
    );

    ipcRenderer.sendMessage(IpcEventsEnum.CheckForUpdates);
  });
};
