import { StagesEnum } from '../../constants/stage.constants';
import { UserRolesEnum } from '../../constants/user.constants';
import { IpcEventsEnum } from '../../main/constants/ipc-events.constants';
import { ApplicationStatus } from '../../main/interfaces';
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

export const downloadEssentialFiles = (): Promise<void> => {
  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.DownloadEssentialFiles, resolve);
    ipcRenderer.sendMessage(IpcEventsEnum.DownloadEssentialFiles);
  });
};

export const play = async ({
  currentGameVersion,
  gameLogin,
  userRole,
  lang,
}: {
  currentGameVersion: string;
  userRole?: UserRolesEnum;
  gameLogin?: string;
  lang: LangsEnum;
}): Promise<ApplicationStatus> => {
  await changeLang({ lang });
  await downloadEssentialFiles();

  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.Play, resolve);

    ipcRenderer.sendMessage(IpcEventsEnum.Play, {
      currentGameVersion,
      gameLogin,
      userRole,
    });
  });
};

export const getLang = (): Promise<LangsEnum> => {
  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.GetGameLang, resolve);
    ipcRenderer.sendMessage(IpcEventsEnum.GetGameLang);
  });
};
