import { LanguageCodesEnum } from '../../constants/locale.constants';

export type User = {
  language?: LanguageCodesEnum;
  password?: string;
  email: string;
  name?: string;
  dof?: string;
  id: string;
};
