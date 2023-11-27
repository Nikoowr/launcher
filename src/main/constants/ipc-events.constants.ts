export type IpcEventSignInDto = {
  password: string;
  user: string;
};

export enum IpcEventsEnum {
  GetUserSession = 'get-user-session',
  WindowEvent = 'window-event',
  UpdateGame = 'update-game',
  SignOut = 'sign-out',
  SignIn = 'sign-in',
  Play = 'play',
}
