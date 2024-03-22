import {
  setDefaultHeadersInterceptor,
  setUserAccessTokenInterceptor,
} from './request';
import { refreshTokenInterceptor } from './response';

export const interceptors = {
  request: {
    setUserAccessTokenInterceptor,
    setDefaultHeadersInterceptor,
  },
  response: {
    refreshTokenInterceptor,
  },
};
