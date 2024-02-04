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
