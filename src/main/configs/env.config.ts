import { get } from 'env-var';

import {
  AutoUpdaterChannelsEnum,
  NodeEnvsEnum,
  StagesEnum,
} from '../constants/env.constants';

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
  DEBUG_PROD: get('DEBUG_PROD').asBool(),

  // Application
  CLIENT_BUCKET_URL: get('CLIENT_BUCKET_URL').required().asUrlString(),
  USER_DATA_ENCRYPTION_KEY: get('USER_DATA_ENCRYPTION_KEY')
    .required()
    .asString(),
  AUTO_UPDATER_URL: get('AUTO_UPDATER_URL').required().asUrlString(),
  AUTO_UPDATER_CHANNEL: get('AUTO_UPDATER_CHANNEL')
    .default(AutoUpdaterChannelsEnum.Latest)
    .asEnum(Object.values(AutoUpdaterChannelsEnum)),
};
