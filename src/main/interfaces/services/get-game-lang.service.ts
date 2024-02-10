import { LangsEnum } from '../../../constants/locale.constants';

export interface GetGameLangService {
  execute(): Promise<LangsEnum | null>;
}
