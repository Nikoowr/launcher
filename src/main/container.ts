import { app as electronApp } from 'electron';

import {
  ApiConfig,
  AutoUpdaterConfig,
  CryptographyConfig,
  FileConfig,
  GameUpdaterConfig,
  MenuConfig,
  envConfig,
} from './configs';
import { IpcEventsController } from './controllers';
import {
  CreateGameLoginService,
  DownloadGameService,
  GetGameInfoService,
  GetUserSessionService,
  PlayGameService,
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
  const gameUpdaterConfig = new GameUpdaterConfig(envConfig);
  const apiConfig = new ApiConfig(envConfig);

  const playGameService = new PlayGameService(
    cryptographyConfig,
    fileConfig,
    envConfig,
    apiConfig,
  );
  const createGameLoginService = new CreateGameLoginService(
    fileConfig,
    apiConfig,
    envConfig,
  );
  const downloadGameService = new DownloadGameService(fileConfig, envConfig);
  const updateGameService = new UpdateGameService(
    gameUpdaterConfig,
    fileConfig,
    envConfig,
  );
  const signOutService = new SignOutService(fileConfig);
  const getUserSessionService = new GetUserSessionService(fileConfig);
  const getGameInfoService = new GetGameInfoService(fileConfig);
  const saveUserSessionService = new SaveUserSessionService(fileConfig);

  const ipcEventsController = new IpcEventsController(app, {
    saveUserSessionService,
    createGameLoginService,
    getUserSessionService,
    downloadGameService,
    getGameInfoService,
    updateGameService,
    playGameService,
    signOutService,
  });

  return { ipcEventsController, autoUpdaterConfig, menuConfig };
};
