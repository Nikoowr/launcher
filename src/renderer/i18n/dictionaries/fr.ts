import { Dictionary } from '..';

export const frDictionary: Dictionary = {
  pages: {
    'sign-in': {
      LOGIN: 'Se connecter',
      CREATE_AN_ACCOUNT: 'Créer un compte',
      DO_NOT_HAVE_AN_ACCOUNT: "Vous n'avez pas de compte?",
    },
    settings: {
      TITLE: 'Paramètres',
      DESCRIPTION:
        'Gérez les paramètres et définissez les préférences de votre compte et du jeu.',
      TAB_ACCOUNT: 'Compte',
      TAB_GAME: 'Jeu',
    },
  },
  components: {
    custom: {
      'account-form': {
        NAME: 'Nom',
        NAME_PLACEHOLDER: 'Votre nom',
        NAME_DESCRIPTION:
          "Ceci est le nom qui s'affichera sur votre profil et dans les emails.",
        DOB: 'Date de naissance',
        DOB_PICK_A_DATE: 'Choisissez une date',
        DOB_DESCRIPTION:
          'Votre date de naissance est utilisée pour calculer votre âge.',
        UPDATE_ACCOUNT: 'Mettre à jour le compte',
      },
      'app-version': {
        LAUNCHER_VERSION: 'Version du lanceur',
      },
      'play-button': {
        PLAY: 'Jouer',
        GAME_VERSION: 'Version du jeu:',
      },
      'profile-form': {
        USERNAME: "Nom d'utilisateur",
        EMAIL: 'E-mail',
        UPDATE_PROFILE: 'Mettre à jour le profil',
      },
      'settings-account-page': {
        TITLE: 'Compte',
        DESCRIPTION:
          'Mettez à jour les paramètres de votre compte. Définissez votre langue préférée, votre nom et votre date de naissance.',
      },
      'settings-game-page': {
        TITLE: 'Jeu',
        DESCRIPTION:
          'Définissez les paramètres du jeu, tels que la résolution, les FPS, les graphismes, etc.',
      },
      'settings-profile-page': {
        TITLE: 'Profil',
        DESCRIPTION: 'Voici comment les autres vous verront sur le site.',
      },
      'sign-in-form': {
        EMAIL: 'Email',
        PASSWORD: 'Mot de passe',
        LOGIN: 'Se connecter',
        FORM_EMAIL_ERROR: 'Veuillez entrer une adresse e-mail valide',
        FORM_PASSWORD_ERROR: 'Veuillez entrer un mot de passe valide',
        FORM_PASSWORD_LENGTH_ERROR:
          'Le mot de passe doit comporter au moins 6 caractères',
        TOAST_ERROR_TITLE: "Une erreur s'est produite lors de la connexion",
        TOAST_ERROR_DESCRIPTION:
          'Veuillez réessayer plus tard. Si le problème persiste, contactez nos administrateurs via Discord.',
      },
      'user-menu': {
        SETTINGS: 'Paramètres',
        LOGOUT: 'Déconnexion',
      },
    },
  },
  hooks: {
    app: {
      UPDATE_FOUND_TOAST_TITLE: 'Nouvelle version disponible',
      UPDATE_FOUND_TOAST_DESCRIPTION:
        'Une nouvelle version du lanceur est disponible. Mettez à jour maintenant pour obtenir les dernières améliorations !',
      UPDATE_FOUND_TOAST_BUTTON: 'Mettre à jour',
    },
    auth: {
      LOGIN_ERROR_TOAST_TITLE: 'Erreur de connexion',
      LOGIN_ERROR_TOAST_DESCRIPTION:
        "Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.",
    },
    game: {
      GAME_STATUS_CHECKING: 'Vérification',
      GAME_STATUS_DOWNLOADING: 'Téléchargement',
      GAME_STATUS_EXTRACTING: 'Extraction',
      GAME_STATUS_CHECKING_UPDATES: 'Vérification des mises à jour',
      GAME_STATUS_DOWNLOADING_UPDATES: 'Téléchargement des mises à jour',
      GAME_STATUS_UPDATING: 'Mise à jour',
      GAME_STATUS_DONE: 'Terminé',
    },
  },
};
