import { UserRolesEnum } from '../../constants/user.constants';
import {
  ApiConfig,
  ApplicationStatus,
  ApplicationStatusType,
  CryptographyConfig,
  EnvConfig,
  ExecutableGameConfig,
  FileConfig,
  PlayGameServiceDto,
  PlayGameService as PlayGameServiceInterface,
} from '../interfaces';

export class PlayGameService implements PlayGameServiceInterface {
  constructor(
    private readonly executableGameConfig: ExecutableGameConfig,
    private readonly cryptographyConfig: CryptographyConfig,
    private readonly fileConfig: FileConfig,
    private readonly envConfig: EnvConfig,
    private readonly apiConfig: ApiConfig,
  ) {}

  public async execute({
    currentGameVersion,
    accessToken,
    userRole,
  }: PlayGameServiceDto): Promise<ApplicationStatus> {
    try {
      console.log('[PlayGameService] - Getting application status...');

      const applicationStatus = await this.apiConfig.getStatus({
        currentGameVersion,
      });

      console.log(
        `[PlayGameService] - Application status: ${JSON.stringify(
          applicationStatus,
          null,
          2,
        )}`,
      );

      const userIsAdmin = userRole === UserRolesEnum.Admin;

      // Always available for admins
      const applicationAvailable = applicationStatus.available || userIsAdmin;

      if (!applicationAvailable) {
        return applicationStatus;
      }

      const login = await this.getGameLogin({ accessToken });

      await this.executeGame({ login });

      return applicationStatus;
    } catch (error) {
      console.error(error);

      return {
        type: ApplicationStatusType.Error,
        available: false,
        data: {
          title: {
            pt: 'Erro interno do servidor',
            en: 'Internal server error',
            es: 'Error interno del servidor',
            fr: 'Erreur interne du serveur',
          },
          description: {
            pt: 'Lamentamos o inconveniente, nossa equipe está trabalhando para resolver o problema o mais rápido possível. Por favor, verifique nosso Discord para atualizações ou entre em contato diretamente com um administrador através de um ticket no Discord.',
            en: 'We apologize for the inconvenience, our team is working to resolve the issue as quickly as possible. Please check our Discord for updates or reach out directly to an administrator via a ticket on Discord.',
            es: 'Lamentamos las molestias, nuestro equipo está trabajando para resolver el problema lo más rápido posible. Por favor, verifica nuestro Discord para actualizaciones o contacta directamente con un administrador a través de un ticket en Discord.',
            fr: 'Nous nous excusons pour le désagrément, notre équipe travaille à résoudre le problème le plus rapidement possible. Veuillez vérifier notre Discord pour des mises à jour ou contacter directement un administrateur via un ticket sur Discord.',
          },
        },
      };
    }
  }

  private async getGameLogin({ accessToken }: { accessToken: string }) {
    console.log('[PlayGameService] - Authenticating...');

    const { login: encryptedLogin } = await this.apiConfig.gameLogin({
      password: '',
      accessToken,
    });

    console.log('[PlayGameService] - Authenticating...');

    const login = await this.cryptographyConfig.decrypt({
      key: this.envConfig.USER_DATA_ENCRYPTION_KEY,
      data: encryptedLogin,
    });

    console.log('[PlayGameService] - Authenticated!');

    return login;
  }

  private async executeGame({ login }: { login: string }) {
    console.log(
      `[PlayGameService] - Game directory: ${this.fileConfig.gameDirectory}`,
    );

    const [user, password] = login.split(':');

    await this.executableGameConfig.execute({
      password,
      user,
    });

    console.log('[PlayGameService] - Game executed!');
  }
}
