import { LangsEnum } from '../../../constants/locale.constants';

export interface ChangeGameLangService {
  execute(lang: LangsEnum): Promise<void>;
}
