import { UserRolesEnum } from '../../../constants/user.constants';
import { LanguageCodesEnum } from '../../constants/locale.constants';

export type User = {
  language?: LanguageCodesEnum;
  role?: UserRolesEnum;
  password?: string;
  email: string;
  name?: string;
  dof?: string;
  id: string;
};
