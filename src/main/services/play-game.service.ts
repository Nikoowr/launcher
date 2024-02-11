import { UserDataStorageFilenamesEnum } from '../constants/store.constants';
import {
  ApiConfig,
  ApplicationStatus,
  ApplicationStatusType,
  CryptographyConfig,
  EnvConfig,
  FileConfig,
  PlayGameServiceDto,
  PlayGameService as PlayGameServiceInterface,
} from '../interfaces';

export class PlayGameService implements PlayGameServiceInterface {
  constructor(
    private readonly cryptographyConfig: CryptographyConfig,
    private readonly fileConfig: FileConfig,
    private readonly envConfig: EnvConfig,
    private readonly apiConfig: ApiConfig,
  ) {}

  public async execute({
    currentGameVersion,
  }: PlayGameServiceDto): Promise<ApplicationStatus> {
    try {
      const applicationStatus = await this.apiConfig.getStatus({
        currentGameVersion,
      });

      if (!applicationStatus.available) {
        return applicationStatus;
      }

      await this.executeGame();

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

  private async executeGame() {
    const encryptedLogin = this.fileConfig.read({
      filename: UserDataStorageFilenamesEnum.UserLogin,
      directory: this.fileConfig.gameDirectory,
    });

    if (!encryptedLogin) {
      throw new Error('Login not found');
    }

    const login = await this.cryptographyConfig.decrypt({
      key: this.envConfig.USER_DATA_ENCRYPTION_KEY,
      data: encryptedLogin,
    });

    const [user, password] = login.split(':');
    const hashedPassword = await this.cryptographyConfig.md5(password);

    await this.fileConfig.openExecutable({
      props: ['EasyFun', `-a ${user}`, `-p ${hashedPassword}`],
      directory: this.fileConfig.gameDirectory,
      executable: 'GrandFantasia.exe',
    });
  }
}
