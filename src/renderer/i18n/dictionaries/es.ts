import { Dictionary } from '..';

export const esDictionary: Dictionary = {
  pages: {
    'sign-in': {
      LOGIN: 'Iniciar sesión',
      CREATE_AN_ACCOUNT: 'Crear cuenta',
      DO_NOT_HAVE_AN_ACCOUNT: '¿No tienes una cuenta?',
    },
    settings: {
      TITLE: 'Configuraciones',
      DESCRIPTION:
        'Administra las configuraciones y establece preferencias de tu cuenta y del juego.',
      TAB_ACCOUNT: 'Cuenta',
      TAB_GAME: 'Juego',
    },
  },
  components: {
    custom: {
      'account-form': {
        NAME: 'Nombre',
        NAME_PLACEHOLDER: 'Tu nombre',
        NAME_DESCRIPTION:
          'Este es el nombre que se mostrará en tu perfil y en correos electrónicos.',
        DOB: 'Fecha de nacimiento',
        DOB_PICK_A_DATE: 'Elige una fecha',
        DOB_DESCRIPTION:
          'Tu fecha de nacimiento se utiliza para calcular tu edad.',
        UPDATE_ACCOUNT: 'Actualizar cuenta',
      },
      'app-version': {
        LAUNCHER_VERSION: 'Versión del Launcher',
      },
      'play-button': {
        PLAY: 'Jugar',
        GAME_VERSION: 'Versión del juego:',
      },
      'profile-form': {
        USERNAME: 'Nombre de usuario',
        EMAIL: 'Correo electrónico',
        UPDATE_PROFILE: 'Actualizar perfil',
      },
      'settings-account-page': {
        TITLE: 'Cuenta',
        DESCRIPTION:
          'Actualiza las configuraciones de tu cuenta. Establece tu idioma preferido, nombre y fecha de nacimiento.',
      },
      'settings-game-page': {
        TITLE: 'Juego',
        DESCRIPTION:
          'Establece las configuraciones del juego, como resolución, FPS, gráficos, etc.',
      },
      'settings-profile-page': {
        TITLE: 'Perfil',
        DESCRIPTION: 'Así es como te verán otras personas en el sitio.',
      },
      'sign-in-form': {
        USER: 'Nombre de usuario',
        PASSWORD: 'Contraseña',
        LOGIN: 'Iniciar sesión',
      },
      'user-menu': {
        SETTINGS: 'Configuraciones',
        LOGOUT: 'Cerrar sesión',
      },
    },
  },
  hooks: {
    app: {
      UPDATE_FOUND_TOAST_TITLE: 'Nueva versión disponible',
      UPDATE_FOUND_TOAST_DESCRIPTION:
        'Hay una nueva versión del Launcher disponible. ¡Actualiza ahora para obtener las últimas mejoras!',
      UPDATE_FOUND_TOAST_BUTTON: 'Actualizar',
    },
    auth: {
      LOGIN_ERROR_TOAST_TITLE: 'Error al iniciar sesión',
      LOGIN_ERROR_TOAST_DESCRIPTION:
        'Hubo un error al iniciar sesión. Inténtalo de nuevo más tarde.',
    },
    game: {
      GAME_STATUS_CHECKING: 'Comprobando',
      GAME_STATUS_DOWNLOADING: 'Descargando',
      GAME_STATUS_EXTRACTING: 'Extrayendo',
      GAME_STATUS_CHECKING_UPDATES: 'Comprobando actualizaciones',
      GAME_STATUS_DOWNLOADING_UPDATES: 'Descargando actualizaciones',
      GAME_STATUS_UPDATING: 'Actualizando',
      GAME_STATUS_DONE: 'Listo',
    },
  },
};
