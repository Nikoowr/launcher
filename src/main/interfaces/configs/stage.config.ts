import { StagesEnum } from '../../../constants/stage.constants';

export interface StageConfig {
  get(): Promise<StagesEnum>;

  save(stage: StagesEnum): Promise<void>;
}
