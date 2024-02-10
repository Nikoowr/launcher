import { LangsEnum } from '../../constants/locale.constants';

export { LangsEnum };

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
    settings: {
      TITLE: string;
      DESCRIPTION: string;
      TAB_ACCOUNT: string;
      TAB_GAME: string;
    };
  };
  components: {
    custom: {
      'account-form': {
        NAME: string;
        NAME_PLACEHOLDER: string;
        NAME_DESCRIPTION?: string;
        DOB: string;
        DOB_PICK_A_DATE: string;
        DOB_DESCRIPTION?: string;
        UPDATE_ACCOUNT: string;
      };
      'app-version': {
        LAUNCHER_VERSION: string;
      };
      'play-button': {
        GAME_VERSION: string;
        PLAY: string;
      };
      'profile-form': {
        USERNAME: string;
        EMAIL: string;
        UPDATE_PROFILE: string;
      };
      'settings-account-page': {
        TITLE: string;
        DESCRIPTION: string;
      };
      'settings-game-page': {
        TITLE: string;
        DESCRIPTION: string;
      };
      'settings-profile-page': {
        TITLE: string;
        DESCRIPTION: string;
      };
      'sign-in-form': {
        EMAIL: string;
        PASSWORD: string;
        LOGIN: string;
        FORM_EMAIL_ERROR: string;
        FORM_PASSWORD_ERROR: string;
        FORM_PASSWORD_LENGTH_ERROR: string;
        TOAST_ERROR_TITLE: string;
        TOAST_ERROR_DESCRIPTION: string;
      };
      'user-menu': {
        SETTINGS: string;
        LOGOUT: string;
      };
    };
  };
  hooks: {
    app: {
      UPDATE_FOUND_TOAST_TITLE: string;
      UPDATE_FOUND_TOAST_DESCRIPTION: string;
      UPDATE_FOUND_TOAST_BUTTON: string;
    };
    auth: {
      LOGIN_ERROR_TOAST_TITLE: string;
      LOGIN_ERROR_TOAST_DESCRIPTION: string;
    };
    game: {
      GAME_STATUS_CHECKING: string;
      GAME_STATUS_DOWNLOADING: string;
      GAME_STATUS_EXTRACTING: string;
      GAME_STATUS_CHECKING_UPDATES: string;
      GAME_STATUS_DOWNLOADING_UPDATES: string;
      GAME_STATUS_UPDATING: string;
      GAME_STATUS_DONE: string;
    };
  };
};
