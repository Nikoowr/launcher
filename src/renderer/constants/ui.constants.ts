export enum ThemesEnum {
  Light = 'light',
  Dark = 'dark',
}

export enum LogoTypesEnum {
  Sprite = 'sprite',
  Text = 'text',
}

export enum LogoColorsByThemeEnum {
  Light = '#000',
  Dark = '#fff',
}

export const LOGO_COLORS_BY_THEME = {
  [ThemesEnum.Dark]: LogoColorsByThemeEnum.Dark,
  [ThemesEnum.Light]: LogoColorsByThemeEnum.Light,
};
