import axios, { AxiosInstance } from 'axios';

import { IpcEventsEnum } from '../../../../main/constants/ipc-events.constants';
import { ApiRoutesEnum } from '../../../constants/api.constants';
import { Session } from '../../../interfaces';
import * as appUtils from '../../../utils/app.utils';
import { interceptors } from '../interceptors';
import { StageUtils } from './stage.utils';

const { ipcRenderer } = window.electron;

export class SessionUtils {
  private readonly api: AxiosInstance;
  private stageUtils = new StageUtils();

  constructor() {
    this.api = axios.create();

    this.api.interceptors.request.use(async (config) => {
      Object.assign(config, {
        baseURL: await this.stageUtils.getApiBaseUrl(),
      });

      return interceptors.request.setApiKeyInterceptor(config);
    });
  }

  public async getSession(): Promise<Session | null> {
    return new Promise((resolve) => {
      ipcRenderer.once(
        IpcEventsEnum.GetUserSession,
        (session: Session | null) => {
          if (!session) {
            return resolve(null);
          }

          if (new Date(session.expiresAt) <= new Date()) {
            return this.deleteSession().finally(() => resolve(null));
          }

          return resolve(session);
        },
      );

      ipcRenderer.sendMessage(IpcEventsEnum.GetUserSession);
    });
  }

  public async saveSession({ session }: { session: Session }): Promise<void> {
    return new Promise((resolve) => {
      ipcRenderer.once(IpcEventsEnum.SaveUserSession, resolve);
      ipcRenderer.sendMessage(IpcEventsEnum.SaveUserSession, { session });
    });
  }

  public async deleteSession() {
    const session = await this.getSession();

    if (session?.accessToken) {
      try {
        await this.api.delete(ApiRoutesEnum.DeleteSessionRoute, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
      } catch {}
    }

    await new Promise((resolve) => {
      ipcRenderer.once(IpcEventsEnum.SignOut, resolve);
      ipcRenderer.sendMessage(IpcEventsEnum.SignOut);
    });

    await appUtils.reload();
  }

  public async refreshSession(refreshToken: string): Promise<Session | null> {
    try {
      const { data } = await this.api.post<Session>(
        ApiRoutesEnum.RefreshSessionRoute,
        {
          refreshToken,
        },
      );

      return data;
    } catch (error) {
      return null;
    }
  }

  public async createGameLogin({
    credentials,
    session,
  }: {
    credentials: { email: string; password: string };
    session: Session;
  }) {
    return new Promise((resolve) => {
      ipcRenderer.once(IpcEventsEnum.CreateGameLogin, resolve);

      ipcRenderer.sendMessage(IpcEventsEnum.CreateGameLogin, {
        credentials,
        session,
      });
    });
  }
}
