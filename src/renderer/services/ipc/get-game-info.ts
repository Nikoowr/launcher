import { IpcEventsEnum } from '../../../main/constants/ipc-events.constants';
import { GameInfo } from '../../../main/interfaces';

const { ipcRenderer } = window.electron;

export const getGameInfo = (): Promise<GameInfo> => {
  return new Promise((resolve) => {
    ipcRenderer.once(
      IpcEventsEnum.GetGameInfo,
      (gameInfo: { version?: string }) => {
        return resolve(gameInfo);
      },
    );

    ipcRenderer.sendMessage(IpcEventsEnum.GetGameInfo);
  });
};
