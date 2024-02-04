import { StagesEnum } from '../../constants/stage.constants';
import {
  SaveStageService as SaveStageServiceInterface,
  StageConfig,
} from '../interfaces';

export class SaveStageService implements SaveStageServiceInterface {
  constructor(private readonly stageConfig: StageConfig) {}

  public async execute(stage: StagesEnum): Promise<void> {
    await this.stageConfig.save(stage);
  }
}
