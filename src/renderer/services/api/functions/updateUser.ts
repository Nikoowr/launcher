import { ApiRoutesEnum } from '../../../constants/api.constants';
import { Session, User } from '../../../interfaces';
import { apiConfig } from '../config';

export type UpdateUserDto = {
  user: Partial<Pick<User, 'id' | 'name' | 'dof' | 'language'>>;
};

export const updateUser = async ({ user }: UpdateUserDto) => {
  await apiConfig.put<Session>(ApiRoutesEnum.UpdateUserRoute, {
    ...user,
  });
};
