import { GameInfo } from '../models/game-info.model';

export interface GetGameInfoService {
  execute(): Promise<GameInfo>;
}
