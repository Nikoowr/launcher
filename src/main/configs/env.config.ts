import { from } from 'env-var';

import {
  AutoUpdaterChannelsEnum,
  NodeEnvsEnum,
  StagesEnum,
} from '../constants/env.constants';

const { get } = from(
  {
    NODE_ENV: process.env.NODE_ENV,
    STAGE: process.env.STAGE,
    UPGRADE_EXTENSIONS: process.env.UPGRADE_EXTENSIONS,
    ELECTRON_PORT: process.env.ELECTRON_PORT,
    DEBUG_PROD: process.env.DEBUG_PROD,
    CLIENT_BUCKET_URL: process.env.CLIENT_BUCKET_URL,
    USER_DATA_ENCRYPTION_KEY: process.env.USER_DATA_ENCRYPTION_KEY,
    AUTO_UPDATER_URL: process.env.AUTO_UPDATER_URL,
    GAME_UPDATER_URL: process.env.GAME_UPDATER_URL,
    AUTO_UPDATER_CHANNEL: process.env.AUTO_UPDATER_CHANNEL,
    AUTO_UPDATER_INTERVAL_HOURS: process.env.AUTO_UPDATER_INTERVAL_HOURS,
  },
  {},
);

export const envConfig = {
  // Environment
  NODE_ENV: get('NODE_ENV')
    .default(NodeEnvsEnum.Production)
    .asEnum(Object.values(NodeEnvsEnum)),

  STAGE: get('STAGE')
    .default(StagesEnum.Prod)
    .asEnum(Object.values(StagesEnum)),

  // Electron
  UPGRADE_EXTENSIONS: get('UPGRADE_EXTENSIONS').asBool(),
  ELECTRON_PORT: get('ELECTRON_PORT').default(1212).asPortNumber(),
  DEBUG_PROD: get('DEBUG_PROD').asString(),

  // Application
  CLIENT_BUCKET_URL: get('CLIENT_BUCKET_URL').required().asUrlString(),
  USER_DATA_ENCRYPTION_KEY: get('USER_DATA_ENCRYPTION_KEY')
    .required()
    .asString(),
  AUTO_UPDATER_URL: get('AUTO_UPDATER_URL').required().asUrlString(),
  GAME_UPDATER_URL: get('GAME_UPDATER_URL').required().asUrlString(),
  AUTO_UPDATER_CHANNEL: get('AUTO_UPDATER_CHANNEL')
    .default(AutoUpdaterChannelsEnum.Latest)
    .asEnum(Object.values(AutoUpdaterChannelsEnum)),
  AUTO_UPDATER_INTERVAL_HOURS: get('AUTO_UPDATER_INTERVAL_HOURS')
    .default(3)
    .asInt(),
};
