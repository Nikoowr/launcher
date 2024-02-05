import { app as electronApp } from 'electron';

import {
  ApiConfig,
  AutoUpdaterConfig,
  CryptographyConfig,
  FileConfig,
  GameUpdaterConfig,
  MenuConfig,
  StageConfig,
  envConfig,
} from './configs';
import { IpcEventsController } from './controllers';
import {
  CreateGameLoginService,
  DownloadGameService,
  GetGameInfoService,
  GetStageService,
  GetUserSessionService,
  PlayGameService,
  SaveStageService,
  SaveUserSessionService,
  SignOutService,
  UpdateGameService,
} from './services';

type ContainerDto = {
  app: typeof electronApp;
};

export const container = ({ app }: ContainerDto) => {
  const cryptographyConfig = new CryptographyConfig();
  const fileConfig = new FileConfig(envConfig);
  const menuConfig = new MenuConfig(fileConfig);
  const autoUpdaterConfig = new AutoUpdaterConfig(
    fileConfig,
    menuConfig,
    envConfig,
  );
  const stageConfig = new StageConfig(fileConfig);
  const gameUpdaterConfig = new GameUpdaterConfig(envConfig, stageConfig);
  const apiConfig = new ApiConfig(envConfig, stageConfig);

  const playGameService = new PlayGameService(
    cryptographyConfig,
    fileConfig,
    envConfig,
    apiConfig,
  );
  const createGameLoginService = new CreateGameLoginService(
    fileConfig,
    apiConfig,
  );
  const downloadGameService = new DownloadGameService(
    fileConfig,
    envConfig,
    stageConfig,
  );
  const updateGameService = new UpdateGameService(
    gameUpdaterConfig,
    fileConfig,
    envConfig,
  );
  const signOutService = new SignOutService(fileConfig);
  const getUserSessionService = new GetUserSessionService(fileConfig);
  const getGameInfoService = new GetGameInfoService(fileConfig);
  const saveUserSessionService = new SaveUserSessionService(fileConfig);

  const saveStageService = new SaveStageService(stageConfig);
  const getStageService = new GetStageService(stageConfig);

  const ipcEventsController = new IpcEventsController(app, {
    saveUserSessionService,
    createGameLoginService,
    getUserSessionService,
    downloadGameService,
    getGameInfoService,
    updateGameService,
    saveStageService,
    playGameService,
    getStageService,
    signOutService,
  });

  return { ipcEventsController, autoUpdaterConfig, menuConfig };
};
