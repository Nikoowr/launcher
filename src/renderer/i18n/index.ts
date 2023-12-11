export enum LocalesEnum {
  ES = 'es',
  EN = 'en',
  FR = 'fr',
  PT = 'pt',
}

export const i18n = {
  defaultLocale: LocalesEnum.PT,
  locales: Object.values(LocalesEnum),
} as const;

export type Dictionary = {};
