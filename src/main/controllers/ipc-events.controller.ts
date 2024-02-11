import {
  type BrowserWindow,
  type IpcMainEvent,
  app as electronApp,
} from 'electron';

import { LangsEnum } from '../../constants/locale.constants';
import { StagesEnum } from '../../constants/stage.constants';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  ChangeGameLangService,
  CreateGameLoginService,
  CreateGameLoginServiceDto,
  DownloadGameService,
  GetGameInfoService,
  GetGameLangService,
  GetStageService,
  GetUserSessionService,
  IpcEventsController as IpcEventsControllerInterface,
  PlayGameService,
  PlayGameServiceDto,
  SaveStageService,
  SaveUserSessionService,
  SaveUserSessionServiceDto,
  SignOutService,
  UpdateGameService,
} from '../interfaces';

type ConstructorServices = {
  createGameLoginService: CreateGameLoginService;
  saveUserSessionService: SaveUserSessionService;
  getUserSessionService: GetUserSessionService;
  changeGameLangService: ChangeGameLangService;
  downloadGameService: DownloadGameService;
  getGameLangService: GetGameLangService;
  getGameInfoService: GetGameInfoService;
  updateGameService: UpdateGameService;
  saveStageService: SaveStageService;
  getStageService: GetStageService;
  playGameService: PlayGameService;
  signOutService: SignOutService;
};

export class IpcEventsController implements IpcEventsControllerInterface {
  constructor(
    private readonly app: typeof electronApp,
    private readonly services: ConstructorServices,
  ) {}

  public async [IpcEventsEnum.SaveUserSession](
    event: Electron.IpcMainEvent,
    dto: SaveUserSessionServiceDto,
  ) {
    await this.services.saveUserSessionService.execute(dto);
    event.reply(IpcEventsEnum.SaveUserSession);
  }

  public async [IpcEventsEnum.CreateGameLogin](
    event: Electron.IpcMainEvent,
    dto: CreateGameLoginServiceDto,
  ) {
    await this.services.createGameLoginService.execute(dto);
    event.reply(IpcEventsEnum.CreateGameLogin);
  }

  public async [IpcEventsEnum.SaveStage](
    event: Electron.IpcMainEvent,
    stage: StagesEnum,
  ) {
    await this.services.saveStageService.execute(stage);
    event.reply(IpcEventsEnum.SaveStage);
  }

  public async [IpcEventsEnum.GetStage](event: Electron.IpcMainEvent) {
    const stage = await this.services.getStageService.execute();
    event.reply(IpcEventsEnum.GetStage, stage);
  }

  public async [IpcEventsEnum.Play](
    event: Electron.IpcMainEvent,
    dto: PlayGameServiceDto,
  ) {
    const response = await this.services.playGameService.execute(dto);
    event.reply(IpcEventsEnum.Play, response);
  }

  public async [IpcEventsEnum.ChangeGameLang](
    event: Electron.IpcMainEvent,
    dto: LangsEnum,
  ) {
    await this.services.changeGameLangService.execute(dto);
    event.reply(IpcEventsEnum.ChangeGameLang);
  }

  public async [IpcEventsEnum.GetGameLang](event: Electron.IpcMainEvent) {
    const lang = await this.services.getGameLangService.execute();
    event.reply(IpcEventsEnum.GetGameLang, lang);
  }

  [IpcEventsEnum.WindowEvent] = (
    event: IpcMainEvent,
    action: 'minimize-tray' | 'close',
    mainWindow: BrowserWindow | null,
  ) => {
    if (action === 'minimize-tray') {
      mainWindow?.hide();
    }

    if (action === 'close') {
      mainWindow?.close();
      this.app.quit();
    }

    event.reply(IpcEventsEnum.WindowEvent);
  };

  [IpcEventsEnum.SignOut] = async (event: Electron.IpcMainEvent) => {
    await this.services.signOutService.execute({ ipcEvent: event });
  };

  [IpcEventsEnum.DownloadGame] = async (event: Electron.IpcMainEvent) => {
    await this.services.downloadGameService.execute({
      ipcEvent: event,
    });
  };

  [IpcEventsEnum.UpdateGame] = async (event: Electron.IpcMainEvent) => {
    await this.services.updateGameService.execute({
      ipcEvent: event,
    });
  };

  [IpcEventsEnum.GetUserSession] = async (event: Electron.IpcMainEvent) => {
    await this.services.getUserSessionService.execute({ ipcEvent: event });
  };

  [IpcEventsEnum.GetAppInfo] = async (event: Electron.IpcMainEvent) => {
    event.reply(IpcEventsEnum.GetAppInfo, {
      version: this.app.getVersion(),
    });
  };

  [IpcEventsEnum.GetGameInfo] = async (event: Electron.IpcMainEvent) => {
    await this.services.getGameInfoService.execute({ ipcEvent: event });
  };
}
