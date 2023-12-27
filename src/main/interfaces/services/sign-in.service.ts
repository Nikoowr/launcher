import type { IpcMainEvent } from 'electron';

import { Session } from '../models/session.model';

export type SignInServiceDto = {
  ipcEvent: IpcMainEvent;
  session: Session;
  credentials: {
    password: string;
    email: string;
  };
};

export interface SignInService {
  execute(dto: SignInServiceDto): Promise<void>;
}
