import { CLIENT_BUCKET_URL } from '../constants/env.constants';
import { GameStatusEnum } from '../constants/game.constants';
import { IpcEventsEnum } from '../constants/ipc-events.constants';
import {
  DownloadGameServiceDto,
  DownloadGameService as DownloadGameServiceInterface,
  FileConfig,
} from '../interfaces';

enum FileActionsEnum {
  Add = 'A',
}

export class DownloadGameService implements DownloadGameServiceInterface {
  constructor(private readonly fileConfig: FileConfig) {}

  public async execute({ ipcEvent }: DownloadGameServiceDto): Promise<void> {
    const { total, files } = await this.getFileList();

    for await (const [index, file] of files.entries()) {
      if (!file) {
        continue;
      }

      const { action, filepath } = this.getFilepathAction(file);

      ipcEvent.reply(IpcEventsEnum.UpdateGame, {
        progress: Math.min(((index + 1) / total) * 100, 99),
        status: GameStatusEnum.Downloading,
        currentFile: filepath,
      });

      await this.handleFileAction({ action, filepath });
    }

    return ipcEvent.reply(IpcEventsEnum.UpdateGame, {
      status: GameStatusEnum.Done,
      progress: 100,
    });
  }

  private async getFileList() {
    const filename = 'GameDataFileList.txt';
    const gameDataFileListUrl = `${CLIENT_BUCKET_URL}/${filename}`;

    const gameDataFileListPath = await this.fileConfig.download({
      directory: this.fileConfig.gameDirectory(),
      url: gameDataFileListUrl,
      filename,
    });

    const fileString = await this.fileConfig.read({
      filepath: gameDataFileListPath,
    });

    const [total, ...files] = fileString.split('\n');

    return { total: Number(total), files };
  }

  private getFilepathAction(file: string) {
    const splitFile = file.split(' ');
    const action = splitFile.shift();
    const filepath = splitFile.join(' ').trim();

    if (!action) {
      throw new Error('Action is required');
    }

    return { filepath, action };
  }

  private async handleFileAction({
    filepath,
    action,
  }: {
    filepath: string;
    action: string;
  }) {
    if (action === FileActionsEnum.Add) {
      await this.fileConfig.download({
        url: `${CLIENT_BUCKET_URL}/${filepath}`,
        directory: this.fileConfig.gameDirectory(),
        filename: filepath,
      });
    }
  }
}
