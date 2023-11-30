export type IpcEventSignInDto = {
  password: string;
  user: string;
};

export enum IpcEventsEnum {
  AutoUpdateQuitAndInstall = 'auto-update-quit-and-install',
  AutoUpdaterFoundUpdate = 'auto-updater-found-update',
  GetUserSession = 'get-user-session',
  DownloadGame = 'download-game',
  UpdateGame = 'update-game',
  WindowEvent = 'window-event',
  SignOut = 'sign-out',
  SignIn = 'sign-in',
  Play = 'play',
  GetAppInfo = 'get-app-info',
}
