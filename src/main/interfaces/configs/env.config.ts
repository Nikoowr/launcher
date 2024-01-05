import { NodeEnvsEnum, StagesEnum } from '../../constants/env.constants';

export type EnvConfig = {
  // Environment
  NODE_ENV: NodeEnvsEnum;
  STAGE: StagesEnum;

  // Electron
  UPGRADE_EXTENSIONS?: boolean;
  ELECTRON_PORT: number;
  DEBUG_PROD?: string;

  // Application
  CLIENT_BUCKET_URL: string;
  USER_DATA_ENCRYPTION_KEY: string;
  AUTO_UPDATER_URL: string;
  GAME_UPDATER_URL: string;
  AUTO_UPDATER_CHANNEL: string;
  AUTO_UPDATER_INTERVAL_HOURS: number;
  DOWNLOAD_GAME_ZIP_FILENAME: string;
  GAME_SERVER_IP: string;

  // API
  API_URL: string;
  API_KEY_TEXT: string;
  API_KEY_TEXT_SALT: string;
  API_KEY_DATE_SALT: string;
};
