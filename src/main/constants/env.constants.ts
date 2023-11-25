export const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const STAGE = process.env.STAGE ?? 'dev';

export const ELECTRON_PORT = process.env.PORT ?? 1212;

export const IS_DEBUG =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const CLIENT_BUCKET_URL =
  process.env.CLIENT_BUCKET_URL ||
  'https://gfchaos-client.s3.us-east-2.amazonaws.com';
