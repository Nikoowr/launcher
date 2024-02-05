import { StagesEnum } from '../../../constants/stage.constants';

export interface SaveStageService {
  execute(stage: StagesEnum): Promise<void>;
}
