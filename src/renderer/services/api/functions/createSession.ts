import { ApiRoutesEnum } from '../../../constants/api.constants';
import { Session } from '../../../interfaces';
import { apiConfigWithoutRefreshToken } from '../config';

type CreateSessionDto = {
  password: string;
  email: string;
};

export const createSession = async ({ password, email }: CreateSessionDto) => {
  const { data } = await apiConfigWithoutRefreshToken.post<Session>(
    ApiRoutesEnum.CreateSessionRoute,
    {
      password,
      email,
    },
  );

  return data;
};
