import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export type RequestInterceptor = (
  config: InternalAxiosRequestConfig,
) => Promise<InternalAxiosRequestConfig>;

export type ResponseInterceptor = (
  apiConfig: AxiosInstance,
  error: AxiosError,
) => Promise<InternalAxiosRequestConfig>;
