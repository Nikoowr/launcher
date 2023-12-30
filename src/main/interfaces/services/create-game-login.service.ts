import { Session } from '../models/session.model';

export type CreateGameLoginServiceDto = {
  session: Session;
  credentials: {
    password: string;
    email: string;
  };
};

export interface CreateGameLoginService {
  execute(dto: CreateGameLoginServiceDto): Promise<void>;
}
