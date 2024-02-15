import { LangsEnum } from '../../../constants/locale.constants';

export type GameInfo = {
  downloadedAt?: string;
  isRunning?: boolean;
  version?: string;
  lang?: LangsEnum;
};
