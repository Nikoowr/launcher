/* eslint-disable @typescript-eslint/no-var-requires */
import { IS_DEBUG, IS_PRODUCTION } from '../constants/env.constants';

if (IS_PRODUCTION) {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (IS_DEBUG) {
  require('electron-debug')();
}
