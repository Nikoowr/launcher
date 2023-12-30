import { RequestInterceptor } from '../../interfaces';
import { sessionUtils } from '../../utils';

export const setUserAccessTokenInterceptor: RequestInterceptor = async (
  config,
) => {
  const session = await sessionUtils.getSession();
  const token = session?.accessToken;

  if (!token) {
    return config;
  }

  Object.assign(config.headers, {
    Authorization: `Bearer ${token}`,
  });

  return config;
};
