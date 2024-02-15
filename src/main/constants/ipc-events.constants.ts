export type IpcEventSignInDto = {
  password: string;
  user: string;
};

export enum IpcEventsEnum {
  AutoUpdateQuitAndInstall = 'auto-update-quit-and-install',
  AutoUpdaterFoundUpdate = 'auto-updater-found-update',
  OpenExternalLink = 'open-external-link',
  SaveUserSession = 'save-user-session',
  CreateGameLogin = 'create-game-login',
  ChangeGameLang = 'change-game-lang',
  GetUserSession = 'get-user-session',
  DownloadGame = 'download-game',
  GetGameLang = 'get-game-lang',
  GetGameInfo = 'get-game-info',
  WindowEvent = 'window-event',
  GetAppInfo = 'get-app-info',
  UpdateGame = 'update-game',
  SaveStage = 'save-stage',
  ReloadApp = 'reload-app',
  GetStage = 'get-stage',
  SignOut = 'sign-out',
  Play = 'play',
}
