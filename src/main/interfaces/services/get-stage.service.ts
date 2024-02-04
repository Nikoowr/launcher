import { StagesEnum } from '../../../constants/stage.constants';

export interface GetStageService {
  execute(): Promise<StagesEnum>;
}
