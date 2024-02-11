import { spawn } from 'node:child_process';

import find from 'find-process';

import {
  ExecutableGameConfig as ExecutableGameConfigInterface,
  FileConfig,
  StorageConfig,
  StorageKeys,
} from '../interfaces';

export class ExecutableGameConfig implements ExecutableGameConfigInterface {
  constructor(
    private readonly fileConfig: FileConfig,
    private readonly storageConfig: StorageConfig,
  ) {}

  public async execute({
    password,
    user,
  }: {
    password: string;
    user: string;
  }): Promise<void> {
    const isAlreadyRunning = await this.isProcessRunning();

    if (isAlreadyRunning) {
      return;
    }

    const executablePath = this.fileConfig.joinPaths([
      this.fileConfig.gameDirectory,
      'GrandFantasia.exe',
    ]);

    const args = ['EasyFun', '-a', user, '-p', password];

    console.log('executablePath', executablePath);
    console.log('args', args);

    const child = spawn(executablePath, args, { detached: true });

    if (child.pid) {
      this.storageConfig.set(StorageKeys.GameExecutablePid, String(child.pid));
    }

    child.unref();
  }

  private async isProcessRunning() {
    const pid = this.storageConfig.get<string>(StorageKeys.GameExecutablePid);

    console.log('pid', pid);

    if (!pid) {
      return false;
    }

    const list = await find('pid', pid);

    return list.length > 0;
  }
}
