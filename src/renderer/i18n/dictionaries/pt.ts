import { Dictionary } from '..';

export const ptDictionary: Dictionary = {
  pages: {
    'sign-in': {
      LOGIN: 'Fazer login',
      CREATE_AN_ACCOUNT: 'Criar conta',
      DO_NOT_HAVE_AN_ACCOUNT: 'Não possuí uma conta?',
    },
    settings: {
      TITLE: 'Configurações',
      DESCRIPTION:
        'Gerencie as configurações e defina preferências da sua conta e do jogo.',
      TAB_ACCOUNT: 'Conta',
      TAB_GAME: 'Jogo',
    },
  },
  components: {
    custom: {
      'account-form': {
        NAME: 'Nome',
        NAME_PLACEHOLDER: 'Seu nome',
        NAME_DESCRIPTION:
          'Este é o nome que será exibido no seu perfil e em e-mails.',
        DOB: 'Data de nascimento',
        DOB_PICK_A_DATE: 'Escolha uma data',
        DOB_DESCRIPTION:
          'Sua data de nascimento é usada para calcular sua idade.',
        UPDATE_ACCOUNT: 'Atualizar conta',
      },
      'app-version': {
        LAUNCHER_VERSION: 'Versão do Launcher',
      },
      'play-button': {
        PLAY: 'Jogar',
        GAME_VERSION: 'Versão do jogo:',
      },
      'profile-form': {
        USERNAME: 'Usuário',
        EMAIL: 'E-mail',
        UPDATE_PROFILE: 'Atualizar perfil',
      },
      'settings-account-page': {
        TITLE: 'Conta',
        DESCRIPTION:
          'Atualize as configurações da sua conta. Defina seu idioma preferido, nome e data de nascimento.',
      },
      'settings-game-page': {
        TITLE: 'Jogo',
        DESCRIPTION:
          'Defina as configurações do jogo, como resolução, FPS, gráficos, etc.',
      },
      'settings-profile-page': {
        TITLE: 'Perfil',
        DESCRIPTION: 'É assim que outras pessoas verão você no site.',
      },
      'sign-in-form': {
        EMAIL: 'E-mail',
        PASSWORD: 'Senha',
        LOGIN: 'Entrar',
        FORM_EMAIL_ERROR: 'Por favor, preencha um e-mail válido',
        FORM_PASSWORD_ERROR: 'Por favor, preencha uma senha válida',
        FORM_PASSWORD_LENGTH_ERROR: 'A senha deve ter no mínimo 6 caracteres',
        TOAST_ERROR_TITLE: 'Ocorreu um erro ao fazer login',
        TOAST_ERROR_DESCRIPTION:
          'Por favor, tente novamente mais tarde. Se o problema persistir, entre em contato com nossos administradores via Discord.',
      },
      'user-menu': {
        SETTINGS: 'Configurações',
        LOGOUT: 'Sair',
      },
    },
  },
  hooks: {
    app: {
      UPDATE_FOUND_TOAST_TITLE: 'Nova versão disponível',
      UPDATE_FOUND_TOAST_DESCRIPTION:
        'Uma nova versão do Launcher está disponível. Atualize agora para obter as últimas melhorias!',
      UPDATE_FOUND_TOAST_BUTTON: 'Atualizar',
    },
    auth: {
      LOGIN_ERROR_TOAST_TITLE: 'Erro no login',
      LOGIN_ERROR_TOAST_DESCRIPTION:
        'Ocorreu um erro ao realizar login, tente novamente mais tarde.',
    },
    game: {
      GAME_STATUS_CHECKING: 'Verificando',
      GAME_STATUS_DOWNLOADING: 'Baixando',
      GAME_STATUS_EXTRACTING: 'Extraindo',
      GAME_STATUS_CHECKING_UPDATES: 'Verificando se há atualizações',
      GAME_STATUS_DOWNLOADING_UPDATES: 'Baixando atualizações',
      GAME_STATUS_UPDATING: 'Atualizando',
      GAME_STATUS_DONE: 'Tudo certo',
    },
  },
};
