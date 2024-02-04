import { StagesEnum } from '../../constants/stage.constants';
import {
  GetStageService as GetStageServiceInterface,
  StageConfig,
} from '../interfaces';

export class GetStageService implements GetStageServiceInterface {
  constructor(private readonly stageConfig: StageConfig) {}

  public async execute(): Promise<StagesEnum> {
    const stage = await this.stageConfig.get();

    return stage;
  }
}
