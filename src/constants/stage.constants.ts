export enum StagesEnum {
  Prod = 'prod',
  Dev = 'dev',
}

export const API_URL = {
  [StagesEnum.Prod]:
    'https://5ulbxbz18d.execute-api.us-east-1.amazonaws.com/prod',
  [StagesEnum.Dev]:
    'https://ch4ehnu7xc.execute-api.us-east-1.amazonaws.com/dev',
};

export const CLIENT_BUCKET_URL = 'https://d23rkkda8ml1ab.cloudfront.net';

export const DOWNLOAD_GAME_ZIP_FILENAME = {
  [StagesEnum.Prod]: 'gfchaos-client.zip',
  [StagesEnum.Dev]: 'dev-gfchaos-client.zip',
};

export const GAME_CLIENT_FOLDER = {
  [StagesEnum.Dev]: 'dev-gfchaos',
  [StagesEnum.Prod]: 'gfchaos',
};

export const SERVER_IP = {
  [StagesEnum.Dev]: '194.147.58.35',
  [StagesEnum.Prod]: '194.147.58.35',
};
