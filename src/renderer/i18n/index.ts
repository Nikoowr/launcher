export enum LangsEnum {
  ES = 'es',
  EN = 'en',
  FR = 'fr',
  PT = 'pt',
}

export const i18n = {
  defaultLocale: LangsEnum.PT,
  locales: Object.values(LangsEnum),
} as const;

export type Dictionary = {
  pages: {
    'sign-in': {
      LOGIN: string;
      CREATE_AN_ACCOUNT: string;
      DO_NOT_HAVE_AN_ACCOUNT: string;
    };
  };
  components: {
    custom: {
      USER: string;
      PASSWORD: string;
      LOGIN: string;
    };
  };
};
