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

      const refreshedSession = await sessionUtils.refreshSession(
        session.refreshToken,
      );

      if (!refreshedSession) {
        throw new Error('Session cannot be refreshed');
      }

      await sessionUtils.saveSession({ session: refreshedSession });

      return apiConfig(originalRequest);
    } catch (refreshSessionError) {
      await sessionUtils.deleteSession();

      return Promise.reject(refreshSessionError);
    }
  }

  return Promise.reject(error);
};
