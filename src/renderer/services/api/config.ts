import axios, { InternalAxiosRequestConfig } from 'axios';

import { securityUtils } from './utils';

export const apiConfig = axios.create({
  baseURL: process.env.API_URL,
});

apiConfig.interceptors.request.use(async (config) => {
  const session = await securityUtils.getUserSession();
  const token = session?.accessToken;

  return {
    ...config,
    headers: {
      ...config.headers,
      'x-api-key': securityUtils.generateApiKey(),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  } as unknown as InternalAxiosRequestConfig;
});
