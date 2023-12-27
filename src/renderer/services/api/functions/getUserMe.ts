import { ApiRoutesEnum } from '../../../constants/api.constants';
import { User } from '../../../interfaces';
import { apiConfig } from '../config';

export const getUserMe = async () => {
  const { data } = await apiConfig.get<{ user: User }>(
    ApiRoutesEnum.GetUserMeRoute,
  );

  return data;
};
