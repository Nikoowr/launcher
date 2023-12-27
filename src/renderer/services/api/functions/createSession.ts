import { ApiRoutesEnum } from '../../../constants/api.constants';
import { Session } from '../../../interfaces';
import { apiConfig } from '../config';

type CreateSessionDto = {
  password: string;
  email: string;
};

export const createSession = async ({ password, email }: CreateSessionDto) => {
  const { data } = await apiConfig.post<Session>(
    ApiRoutesEnum.CreateSessionRoute,
    {
      password,
      email,
    },
  );

  return data;
};
