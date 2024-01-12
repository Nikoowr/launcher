import axios, { AxiosError } from 'axios';

import { interceptors } from './interceptors';

export const apiConfig = axios.create({
  baseURL: process.env.API_URL,
});

export const apiConfigWithoutInterceptors = axios.create({
  baseURL: process.env.API_URL,
});

apiConfig.interceptors.request.use(async (config) => {
  return interceptors.request.setUserAccessTokenInterceptor(
    await interceptors.request.setApiKeyInterceptor(config),
  );
});

apiConfig.interceptors.response.use(
  (response) => response,
  async function (error: AxiosError) {
    return interceptors.response.refreshTokenInterceptor(apiConfig, error);
  },
);
