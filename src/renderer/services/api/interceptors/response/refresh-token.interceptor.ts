import { InternalAxiosRequestConfig } from 'axios';

import { HttpStatusCodesEnum } from '../../../../constants/http.constants';
import { sessionUtils } from '../../utils';
import { ResponseInterceptor } from './../../interfaces/interceptors';

export const refreshTokenInterceptor: ResponseInterceptor = async (
  apiConfig,
  error,
) => {
  const originalRequest = error.config as InternalAxiosRequestConfig;

  if (error.response?.status === HttpStatusCodesEnum.UNAUTHORIZED) {
    try {
      const session = await sessionUtils.getSession();

      if (!session?.refreshToken) {
        throw new Error('Refresh token does not exist');
      }

      const refreshToken = session?.refreshToken;

      const refreshedSession = await sessionUtils.refreshSession(refreshToken);

      if (!refreshedSession) {
        throw new Error('Session cannot be refreshed');
      }

      apiConfig.defaults.headers.common.Authorization = `Bearer ${refreshedSession.accessToken}`;

      // await securityUtils.saveUserSession(session);

      return apiConfig(originalRequest);
    } catch (refreshSessionError) {
      // await securityUtils.deleteUserAuth();
      return Promise.reject(refreshSessionError);
    }
  }

  return Promise.reject(error);
};
