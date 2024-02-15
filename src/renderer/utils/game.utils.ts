import { StagesEnum } from '../../constants/stage.constants';
import { IpcEventsEnum } from '../../main/constants/ipc-events.constants';
import { ApplicationStatus, GameInfo } from '../../main/interfaces';
import { LangsEnum } from '../i18n';

const { ipcRenderer } = window.electron;

export const getStage = (): Promise<StagesEnum> => {
  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.GetStage, resolve);
    ipcRenderer.sendMessage(IpcEventsEnum.GetStage);
  });
};

export const saveStage = (stage: StagesEnum): Promise<StagesEnum> => {
  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.SaveStage, resolve);
    ipcRenderer.sendMessage(IpcEventsEnum.SaveStage, stage);
  });
};

export const getVersion = (): Promise<string> => {
  return new Promise((resolve) => {
    ipcRenderer.once(
      IpcEventsEnum.GetGameInfo,
      (gameInfo: { version?: string }) => {
        return resolve(gameInfo?.version || 'v0.0.0');
      },
    );

    ipcRenderer.sendMessage(IpcEventsEnum.GetGameInfo);
  });
};

export const play = ({
  currentGameVersion,
}: {
  currentGameVersion: string;
}): Promise<ApplicationStatus> => {
  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.Play, resolve);
    ipcRenderer.sendMessage(IpcEventsEnum.Play, { currentGameVersion });
  });
};

export const changeLang = ({
  lang,
}: {
  lang: LangsEnum;
}): Promise<ApplicationStatus> => {
  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.ChangeGameLang, resolve);
    ipcRenderer.sendMessage(IpcEventsEnum.ChangeGameLang, lang);
  });
};

export const getLang = (): Promise<LangsEnum> => {
  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.GetGameLang, resolve);
    ipcRenderer.sendMessage(IpcEventsEnum.GetGameLang);
  });
};

export const isRunning = (): Promise<boolean> => {
  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.GetGameInfo, (gameInfo: GameInfo) =>
      resolve(!!gameInfo?.isRunning),
    );

    ipcRenderer.sendMessage(IpcEventsEnum.GetGameInfo);
  });
};
