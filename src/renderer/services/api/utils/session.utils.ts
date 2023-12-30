import axios, { AxiosInstance } from 'axios';

import { IpcEventsEnum } from '../../../../main/constants/ipc-events.constants';
import { ApiRoutesEnum } from '../../../constants/api.constants';
import { Session } from '../../../interfaces';
import { interceptors } from '../interceptors';

const { ipcRenderer } = window.electron;

export class SessionUtils {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.API_URL,
    });

    this.api.interceptors.request.use(async (config) =>
      interceptors.request.setApiKeyInterceptor(config),
    );
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

  public async saveSession(session: Session): Promise<void> {
    console.log('session', session);
    ///
  }

  public async deleteSession() {
    const session = await this.getSession();

    if (session?.accessToken) {
      await this.api.delete(ApiRoutesEnum.DeleteSessionRoute, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
    }

    await new Promise((resolve) => {
      ipcRenderer.once(IpcEventsEnum.SignOut, resolve);
      ipcRenderer.sendMessage(IpcEventsEnum.SignOut);
    });
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

  public async saveUserAuth({
    credentials,
    session,
  }: {
    credentials: { email: string; password: string };
    session: Session;
  }) {
    return new Promise((resolve) => {
      ipcRenderer.once(IpcEventsEnum.SignIn, resolve);

      ipcRenderer.sendMessage(IpcEventsEnum.SignIn, {
        credentials,
        session,
      });
    });
  }
}
