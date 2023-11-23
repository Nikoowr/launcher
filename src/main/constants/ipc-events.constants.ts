export type IpcEventSignInDto = {
  password: string;
  user: string;
};

export enum IpcEventsEnum {
  WindowEvent = 'window-event',
  SignIn = 'sign-in',
  Play = 'play',
}
