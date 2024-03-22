import { apiConfig } from '../config';

export const getGameLogin = async (): Promise<string | null> => {
  try {
    const { data } = await apiConfig.post<{ login: string }>(
      '/v1/user/game-login',
      { password: '' },
    );

    return data?.login;
  } catch (error) {
    return null;
  }
};
