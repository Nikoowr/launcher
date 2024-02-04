import { API_URL, StagesEnum } from '../../../../constants/stage.constants';
import { IpcEventsEnum } from '../../../../main/constants/ipc-events.constants';

const { ipcRenderer } = window.electron;

export class StageUtils {
  public async getApiBaseUrl() {
    try {
      const stage = await this.getStage();

      return API_URL[stage];
    } catch (error) {
      console.error(error);

      return API_URL[StagesEnum.Prod];
    }
  }

  public async getStage(): Promise<StagesEnum> {
    return new Promise((resolve) => {
      ipcRenderer.once(IpcEventsEnum.GetStage, resolve);
      ipcRenderer.sendMessage(IpcEventsEnum.GetStage);
    });
  }

  public async saveStage(stage: StagesEnum): Promise<StagesEnum> {
    return new Promise((resolve) => {
      ipcRenderer.once(IpcEventsEnum.SaveStage, resolve);
      ipcRenderer.sendMessage(IpcEventsEnum.SaveStage, stage);
    });
  }
}
