import path from 'path';
import { URL } from 'url';

import { ELECTRON_PORT, IS_DEBUG, NODE_ENV } from './constants/env.constants';

export function resolveHtmlPath(htmlFileName: string) {
  if (NODE_ENV === 'development') {
    const url = new URL(`http://localhost:${ELECTRON_PORT}`);

    url.pathname = htmlFileName;

    return url.href;
  }

  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export const installExtensions = async () => {
  if (!IS_DEBUG) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};
