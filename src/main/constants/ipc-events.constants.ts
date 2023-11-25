export type IpcEventSignInDto = {
  password: string;
  user: string;
};

export enum IpcEventsEnum {
  WindowEvent = 'window-event',
  UpdateGame = 'update-game',
  SignIn = 'sign-in',
  Play = 'play',
}
