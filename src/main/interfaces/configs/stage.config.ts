import { StagesEnum } from '../../../constants/stage.constants';

export interface StageConfig {
  get(): StagesEnum;

  save(stage: StagesEnum): Promise<void>;
}
