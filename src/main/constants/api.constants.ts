export enum ApiRoutesEnum {
  GetAppStatusRoute = '/v1/status/application-status',
  GameLoginRoute = '/v1/user/game-login',
}

export enum GameStatusEnum {
  NotYetReleased = 'not-yet-released',
  Maintenance = 'maintenance',
  Offline = 'offline',
  Online = 'online',
}
