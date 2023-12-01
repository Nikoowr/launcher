export type IpcEventSignInDto = {
  password: string;
  user: string;
};

export enum IpcEventsEnum {
  AutoUpdateQuitAndInstall = 'auto-update-quit-and-install',
  AutoUpdaterFoundUpdate = 'auto-updater-found-update',
  GetUserSession = 'get-user-session',
  DownloadGame = 'download-game',
  GetGameInfo = 'get-game-info',
  WindowEvent = 'window-event',
  GetAppInfo = 'get-app-info',
  UpdateGame = 'update-game',
  SignOut = 'sign-out',
  SignIn = 'sign-in',
  Play = 'play',
}
