import { app as electronApp } from 'electron';

import {
  ApiConfig,
  AutoUpdaterConfig,
  CryptographyConfig,
  ExecutableGameConfig,
  FileConfig,
  GameUpdaterConfig,
  MenuConfig,
  StageConfig,
  StorageConfig,
  envConfig,
  request,
  unzip,
  versionConfig,
} from './configs';
import { IpcEventsController } from './controllers';
import {
  ChangeGameLangService,
  CheckForUpdatesService,
  CreateGameLoginService,
  DownloadEssentialFilesService,
  DownloadGameService,
  DownloadLatestUpdatesService,
  GetGameInfoService,
  GetGameLangService,
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
  const storageConfig = new StorageConfig();
  const cryptographyConfig = new CryptographyConfig();
  const fileConfig = new FileConfig(envConfig);
  const executableGameConfig = new ExecutableGameConfig(
    fileConfig,
    storageConfig,
  );
  const menuConfig = new MenuConfig(fileConfig);
  const autoUpdaterConfig = new AutoUpdaterConfig(
    fileConfig,
    menuConfig,
    envConfig,
  );
  const stageConfig = new StageConfig(fileConfig);
  const gameUpdaterConfig = new GameUpdaterConfig(envConfig, stageConfig);
  const apiConfig = new ApiConfig(envConfig, stageConfig, fileConfig);

  const playGameService = new PlayGameService(
    executableGameConfig,
    cryptographyConfig,
    fileConfig,
    envConfig,
    apiConfig,
    stageConfig,
  );
  const createGameLoginService = new CreateGameLoginService(
    fileConfig,
    apiConfig,
  );
  const downloadGameService = new DownloadGameService(
    fileConfig,
    apiConfig,
    stageConfig,
    unzip,
  );
  const updateGameService = new UpdateGameService(
    gameUpdaterConfig,
    fileConfig,
    envConfig,
    stageConfig,
  );
  const downloadEssentialFilesService = new DownloadEssentialFilesService(
    fileConfig,
  );
  const saveUserSessionService = new SaveUserSessionService(fileConfig);
  const getUserSessionService = new GetUserSessionService(fileConfig);
  const changeGameLangService = new ChangeGameLangService(fileConfig);
  const getGameLangService = new GetGameLangService(fileConfig);
  const getGameInfoService = new GetGameInfoService(
    executableGameConfig,
    fileConfig,
  );
  const saveStageService = new SaveStageService(stageConfig);
  const getStageService = new GetStageService(stageConfig);
  const signOutService = new SignOutService(fileConfig);

  const checkForUpdatesService = new CheckForUpdatesService(
    stageConfig,
    request,
    fileConfig,
    versionConfig,
  );

  const downloadLatestUpdatesService = new DownloadLatestUpdatesService(
    stageConfig,
    fileConfig,
    unzip,
  );

  const ipcEventsController = new IpcEventsController(
    app,
    {
      downloadEssentialFilesService,
      downloadLatestUpdatesService,
      checkForUpdatesService,
      saveUserSessionService,
      createGameLoginService,
      changeGameLangService,
      getUserSessionService,
      downloadGameService,
      getGameLangService,
      getGameInfoService,
      updateGameService,
      saveStageService,
      playGameService,
      getStageService,
      signOutService,
    },
    { fileConfig },
  );

  return { ipcEventsController, autoUpdaterConfig, menuConfig };
};
