export enum ApiRoutesEnum {
  RefreshSessionRoute = '/v1/user/session/refresh',
  CreateSessionRoute = '/v1/user/session',
  DeleteSessionRoute = '/v1/user/session',
  GetUserMeRoute = '/v1/user/me',
  UpdateUserRoute = '/v1/user',
}

export enum GameStatusEnum {
  NotYetReleased = 'not-yet-released',
  Maintenance = 'maintenance',
  Offline = 'offline',
  Online = 'online',
}
