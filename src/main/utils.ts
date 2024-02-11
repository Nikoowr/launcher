/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import { URL } from 'url';

import { app } from 'electron';

import { envConfig } from './configs/env.config';
import { NodeEnvsEnum } from './constants/env.constants';

const IS_DEBUG =
  envConfig.NODE_ENV === NodeEnvsEnum.Development ||
  envConfig.DEBUG_PROD === 'true';

export const resolveHtmlPath = (htmlFileName: string) => {
  if (envConfig.NODE_ENV === NodeEnvsEnum.Development) {
    const url = new URL(`http://localhost:${envConfig.ELECTRON_PORT}`);

    url.pathname = htmlFileName;

    return url.href;
  }

  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
};

export const installExtensions = async () => {
  if (!IS_DEBUG) {
    return;
  }

  const installer = require('electron-devtools-installer');
  const forceDownload = !!envConfig.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

export const envSetup = () => {
  const isProduction = envConfig.NODE_ENV === NodeEnvsEnum.Production;

  if (process.platform === 'win32') {
    app.setAppUserModelId(app.name);
  }

  if (isProduction) {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
  }

  if (IS_DEBUG) {
    require('electron-debug')();
  }
};
