import { FileConfig } from '../configs';
import {
  GameFilesEnum,
  GameUpdateStatusEnum,
  GameUpdaterActionsEnum,
} from '../constants/game.constants';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  EnvConfig,
  GameUpdaterConfig,
  UpdateGameServiceDto,
  UpdateGameService as UpdateGameServiceInterface,
} from '../interfaces';

type FileChange = {
  action: GameUpdaterActionsEnum;
  version: string;
  filepath: string;
};

type FileChanges = {
  [key: string]: FileChange;
};

export class UpdateGameService implements UpdateGameServiceInterface {
  constructor(
    private readonly gameUpdaterConfig: GameUpdaterConfig,
    private readonly fileConfig: FileConfig,
    private readonly envConfig: EnvConfig,
  ) {}

  public async execute({ ipcEvent }: UpdateGameServiceDto): Promise<void> {
    // Progress 0 - 20
    ipcEvent.reply(IpcEventsEnum.UpdateGame, {
      status: GameUpdateStatusEnum.Checking,
      progress: 0,
    });

    const { versionsToDownload, latestVersion, gameInfo } =
      await this.checkForUpdates({ ipcEvent });

    if (!versionsToDownload.length) {
      return ipcEvent.reply(IpcEventsEnum.UpdateGame, {
        status: GameUpdateStatusEnum.Done,
        progress: 100,
      });
    }

    const fileChanges: FileChanges = {};

    // Progress 21 - 50
    for (const [index, versionToDownload] of versionsToDownload.entries()) {
      const versionFileChanges = await this.getFileChangesByVersion(
        versionToDownload,
      );

      if (versionFileChanges) {
        Object.assign(fileChanges, versionFileChanges);
      }

      ipcEvent.reply(IpcEventsEnum.UpdateGame, {
        progress: ((index + 1) / versionsToDownload.length) * 50,
        status: GameUpdateStatusEnum.Downloading,
        currentFilename: versionToDownload,
      });
    }

    const fileChangesValues = Object.values(fileChanges);

    // Progress 51 - 99
    for (const [index, fileChange] of fileChangesValues.entries()) {
      await this.handleFileChange(fileChange);

      const splitFilepath = fileChange.filepath.split('/');
      const filename = splitFilepath[splitFilepath.length - 1];

      ipcEvent.reply(IpcEventsEnum.UpdateGame, {
        progress: ((index + 1) / fileChangesValues.length) * 99,
        status: GameUpdateStatusEnum.Updating,
        currentFilename: filename,
      });
    }

    const latestGameInfo = {
      ...gameInfo,
      version: latestVersion,
    };

    await this.fileConfig.write({
      directory: this.fileConfig.gameDirectory,
      data: JSON.stringify(latestGameInfo),
      filename: GameFilesEnum.GameInfo,
    });

    ipcEvent.reply(IpcEventsEnum.GetGameInfo, latestGameInfo);

    return ipcEvent.reply(IpcEventsEnum.UpdateGame, {
      status: GameUpdateStatusEnum.Done,
      progress: 100,
    });
  }

  private async checkForUpdates({ ipcEvent }: UpdateGameServiceDto) {
    ipcEvent.reply(IpcEventsEnum.UpdateGame, {
      status: GameUpdateStatusEnum.Checking,
      progress: 0,
    });

    const patchInfo = await this.gameUpdaterConfig.getPatchInfo();

    ipcEvent.reply(IpcEventsEnum.UpdateGame, {
      status: GameUpdateStatusEnum.Checking,
      progress: 10,
    });

    const gameInfoJson = await this.fileConfig.read({
      directory: this.fileConfig.gameDirectory,
      filename: GameFilesEnum.GameInfo,
    });

    const gameInfo = gameInfoJson ? JSON.parse(gameInfoJson) : {};

    const currentVersion = gameInfo?.version ?? 'v0.0.0';
    const versionsToDownload = (patchInfo?.versions ?? []).filter((version) =>
      this.versionIsGreater(version, currentVersion),
    );

    ipcEvent.reply(IpcEventsEnum.UpdateGame, {
      status: GameUpdateStatusEnum.Checking,
      progress: 20,
    });

    return {
      latestVersion: patchInfo?.latest ?? 'v0.0.0',
      versionsToDownload,
      gameInfo,
    };
  }

  private async getFileChangesByVersion(
    versionToDownload: string,
  ): Promise<FileChanges | null> {
    const gameDataFileList = await this.gameUpdaterConfig.getGameDataFileList({
      version: versionToDownload,
    });

    if (!gameDataFileList) {
      return null;
    }

    return gameDataFileList.fileChanges.reduce(
      (fileChangesByVersion, fileChangeLine) => {
        const [action, ...filepathParts] = fileChangeLine.split(/\s+/);
        const filepath = filepathParts.join(' ');

        if (
          fileChangesByVersion[filepath] &&
          this.versionIsGreater(
            fileChangesByVersion[filepath].version,
            versionToDownload,
          )
        ) {
          return fileChangesByVersion;
        }

        return {
          ...fileChangesByVersion,
          [filepath]: {
            action: action as GameUpdaterActionsEnum,
            version: versionToDownload,
            filepath,
          },
        };
      },
      {} as FileChanges,
    );
  }

  private async handleFileChange(fileChange: FileChange): Promise<void> {
    const mappedFilepath = this.mapFilePath(fileChange.filepath);

    console.log(`[UpdateGameService] - ${fileChange.action} ${mappedFilepath}`);

    if (fileChange.action === GameUpdaterActionsEnum.Deleted) {
      await this.fileConfig.delete({
        directory: this.fileConfig.gameDirectory,
        filename: mappedFilepath,
      });

      return;
    }

    const url = `${this.envConfig.GAME_UPDATER_URL}${this.envConfig.STAGE}/${fileChange.version}/${fileChange.filepath}`;

    await this.fileConfig.download({
      directory: this.fileConfig.gameDirectory,
      filename: mappedFilepath,
      id: url,
      url,
    });
  }

  private mapFilePath(filepath: string): string {
    const mapDirectories: [string, string, { lower?: boolean }][] = [
      ['Data/client/', '', {}],
      ['Data/db/S_', 'data/db/c_', { lower: true }],
      ['Data/scene/S', 'data/scene/s', {}],
      ['Data/Translate', 'data/translate', {}],
    ];

    for (const [origin, destination, options] of mapDirectories) {
      if (filepath.startsWith(origin)) {
        filepath = filepath.replace(origin, destination);

        if (options.lower) {
          filepath = filepath.toLowerCase();
        }

        break;
      }
    }

    return filepath;
  }

  private versionIsGreater(versionOne: string, versionTwo: string) {
    const components1 = versionOne.split('.');
    const components2 = versionTwo.split('.');

    for (let i = 0; i < Math.max(components1.length, components2.length); i++) {
      const part1 = components1[i] || '0';
      const part2 = components2[i] || '0';

      if (/^\d+$/.test(part1) && /^\d+$/.test(part2)) {
        // Compare numeric components as integers
        const num1 = parseInt(part1, 10);
        const num2 = parseInt(part2, 10);

        if (num1 > num2) {
          return true;
        } else if (num1 < num2) {
          return false;
        }
      } else {
        // Compare non-numeric components lexicographically
        if (part1 > part2) {
          return true;
        } else if (part1 < part2) {
          return false;
        }
      }
    }

    // If all components are equal, consider the versions equal
    return false;
  }
}
