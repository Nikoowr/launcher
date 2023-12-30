import { Session } from '../models/session.model';

export type SaveUserSessionServiceDto = {
  session: Session;
};

export interface SaveUserSessionService {
  execute(dto: SaveUserSessionServiceDto): Promise<void>;
}
