import { LanguageCodesEnum } from '../../constants/locale.constants';

export enum UserRolesEnum {
  Admin = 'admin',
}

export type User = {
  language?: LanguageCodesEnum;
  role?: UserRolesEnum;
  password?: string;
  email: string;
  name?: string;
  dof?: string;
  id: string;
};
