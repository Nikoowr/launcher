import { RequestInterceptor } from '../../interfaces';
import { securityUtils } from '../../utils';

export const setApiKeyInterceptor: RequestInterceptor = async (config) => {
  Object.assign(config.headers, {
    'x-api-key': securityUtils.generateApiKey(),
  });

  return config;
};
