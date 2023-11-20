import path from 'path';
import { URL } from 'url';

import { ELECTRON_PORT, NODE_ENV } from './constants/env.constants';

export function resolveHtmlPath(htmlFileName: string) {
  if (NODE_ENV === 'development') {
    const url = new URL(`http://localhost:${ELECTRON_PORT}`);

    url.pathname = htmlFileName;

    return url.href;
  }

  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}
