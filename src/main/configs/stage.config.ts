import { StagesEnum } from '../../constants/stage.constants';
import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import { FileConfig, StageConfig as StageConfigInterface } from '../interfaces';

export class StageConfig implements StageConfigInterface {
  constructor(private readonly fileConfig: FileConfig) {}

  public get(): StagesEnum {
    const jsonData = this.fileConfig.read({
      filename: UserDataStorageFilenamesEnum.AdminConfig,
      directory: this.fileConfig.adminConfigDirectory,
    });

    if (!jsonData) {
      return StagesEnum.Prod;
    }

    const { stage = null } = JSON.parse(jsonData) || {};

    const validStage = Object.values(StagesEnum).find(
      (stageEnum) => stageEnum === stage,
    );

    return validStage || StagesEnum.Prod;
  }

  public async save(stage: string): Promise<void> {
    await this.fileConfig.write({
      filename: UserDataStorageFilenamesEnum.AdminConfig,
      directory: this.fileConfig.adminConfigDirectory,
      data: JSON.stringify({ stage }),
    });
  }
}
