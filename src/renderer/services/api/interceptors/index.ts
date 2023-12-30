import { setApiKeyInterceptor, setUserAccessTokenInterceptor } from './request';
import { refreshTokenInterceptor } from './response';

export const interceptors = {
  request: {
    setApiKeyInterceptor,
    setUserAccessTokenInterceptor,
  },
  response: {
    refreshTokenInterceptor,
  },
};
