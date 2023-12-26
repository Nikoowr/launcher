import { Dictionary } from '..';

export const enDictionary: Dictionary = {
  pages: {
    'sign-in': {
      LOGIN: 'Log in',
      CREATE_AN_ACCOUNT: 'Create an account',
      DO_NOT_HAVE_AN_ACCOUNT: "Don't have an account?",
    },
    settings: {
      TITLE: 'Settings',
      DESCRIPTION:
        'Manage settings and set preferences for your account and the game.',
      TAB_ACCOUNT: 'Account',
      TAB_GAME: 'Game',
    },
  },
  components: {
    custom: {
      'account-form': {
        NAME: 'Name',
        NAME_PLACEHOLDER: 'Your name',
        NAME_DESCRIPTION:
          'This is the name that will be displayed on your profile and in emails.',
        DOB: 'Date of birth',
        DOB_PICK_A_DATE: 'Pick a date',
        DOB_DESCRIPTION: 'Your date of birth is used to calculate your age.',
        UPDATE_ACCOUNT: 'Update account',
      },
      'app-version': {
        LAUNCHER_VERSION: 'Launcher Version',
      },
      'play-button': {
        PLAY: 'Play',
        GAME_VERSION: 'Game Version:',
      },
      'profile-form': {
        USERNAME: 'Username',
        EMAIL: 'Email',
        UPDATE_PROFILE: 'Update profile',
      },
      'settings-account-page': {
        TITLE: 'Account',
        DESCRIPTION:
          'Update settings for your account. Set your preferred language, name, and date of birth.',
      },
      'settings-game-page': {
        TITLE: 'Game',
        DESCRIPTION:
          'Set game settings, such as resolution, FPS, graphics, etc.',
      },
      'settings-profile-page': {
        TITLE: 'Profile',
        DESCRIPTION: 'This is how others will see you on the site.',
      },
      'sign-in-form': {
        EMAIL: 'Email',
        PASSWORD: 'Password',
        LOGIN: 'Log in',
        FORM_EMAIL_ERROR: 'Please enter a valid email',
        FORM_PASSWORD_ERROR: 'Please enter a valid password',
        FORM_PASSWORD_LENGTH_ERROR:
          'Password must be at least 6 characters long',
        TOAST_ERROR_TITLE: 'An error occurred while logging in',
        TOAST_ERROR_DESCRIPTION:
          'Please try again later. If the problem persists, contact our administrators via Discord.',
      },
      'user-menu': {
        SETTINGS: 'Settings',
        LOGOUT: 'Logout',
      },
    },
  },
  hooks: {
    app: {
      UPDATE_FOUND_TOAST_TITLE: 'New version available',
      UPDATE_FOUND_TOAST_DESCRIPTION:
        'A new version of the Launcher is available. Update now to get the latest improvements!',
      UPDATE_FOUND_TOAST_BUTTON: 'Update',
    },
    auth: {
      LOGIN_ERROR_TOAST_TITLE: 'Login error',
      LOGIN_ERROR_TOAST_DESCRIPTION:
        'There was an error during login. Please try again later.',
    },
    game: {
      GAME_STATUS_CHECKING: 'Checking',
      GAME_STATUS_DOWNLOADING: 'Downloading',
      GAME_STATUS_EXTRACTING: 'Extracting',
      GAME_STATUS_CHECKING_UPDATES: 'Checking for updates',
      GAME_STATUS_DOWNLOADING_UPDATES: 'Downloading updates',
      GAME_STATUS_UPDATING: 'Updating',
      GAME_STATUS_DONE: 'Done',
    },
  },
};
