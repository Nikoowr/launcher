import * as appUtils from '../../../../utils/app.utils';
import { RequestInterceptor } from '../../interfaces';
import { securityUtils } from '../../utils';

export const setDefaultHeadersInterceptor: RequestInterceptor = async (
  config,
) => {
  let mac = '';

  try {
    mac = await appUtils.getMAC();
  } catch (error) {
    console.error(error);
  }

  Object.assign(config.headers, {
    'x-api-key': securityUtils.generateApiKey(),
    'x-mac': mac,
  });

  return config;
};
