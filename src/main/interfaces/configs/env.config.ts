import { NodeEnvsEnum, StagesEnum } from '../../constants/env.constants';

export type EnvConfig = {
  // Environment
  NODE_ENV: NodeEnvsEnum;
  STAGE: StagesEnum;

  // Electron
  UPGRADE_EXTENSIONS?: boolean;
  ELECTRON_PORT: number;
  DEBUG_PROD?: boolean;

  // Application
  CLIENT_BUCKET_URL: string;
  USER_DATA_ENCRYPTION_KEY: string;
};
