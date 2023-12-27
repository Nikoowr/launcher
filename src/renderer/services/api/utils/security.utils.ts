import { AES } from 'crypto-js';

import { IpcEventsEnum } from '../../../../main/constants/ipc-events.constants';
import { Session } from '../../../interfaces';

const { ipcRenderer } = window.electron;

export const generateApiKey = () => {
  const encryptedAuthText = AES.encrypt(
    process.env.API_KEY_TEXT as string,
    process.env.API_KEY_TEXT_SALT as string,
  );
  const encryptedDate = AES.encrypt(
    new Date().toISOString(),
    process.env.API_KEY_DATE_SALT as string,
  );

  return `${encryptedAuthText}::${encryptedDate}`;
};

export const getUserSession = async (): Promise<Session | null> => {
  return new Promise((resolve) => {
    ipcRenderer.once(
      IpcEventsEnum.GetUserSession,
      (session: Session | null) => {
        if (!session) {
          return resolve(null);
        }

        if (new Date(session.expiresAt) <= new Date()) {
          return deleteUserAuth().finally(() => resolve(null));
        }

        return resolve(session);
      },
    );

    ipcRenderer.sendMessage(IpcEventsEnum.GetUserSession);
  });
};

export const saveUserAuth = async ({
  credentials,
  session,
}: {
  credentials: { email: string; password: string };
  session: Session;
}) => {
  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.SignIn, resolve);

    ipcRenderer.sendMessage(IpcEventsEnum.SignIn, {
      credentials,
      session,
    });
  });
};

export const deleteUserAuth = async () => {
  return new Promise((resolve) => {
    ipcRenderer.once(IpcEventsEnum.SignOut, resolve);
    ipcRenderer.sendMessage(IpcEventsEnum.SignOut);
  });
};
