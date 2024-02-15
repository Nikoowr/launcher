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
    const isAlreadyRunning = await this.isRunning();

    if (isAlreadyRunning) {
      return;
    }

    const executablePath = this.fileConfig.joinPaths([
      this.fileConfig.gameDirectory,
      'GrandFantasia.exe',
    ]);

    const args = ['EasyFun', '-a', user, '-p', password];

    const child = spawn(executablePath, args, {
      cwd: this.fileConfig.gameDirectory,
      detached: true,
    });

    if (child.pid) {
      this.storageConfig.set(StorageKeys.GameExecutablePid, String(child.pid));
    }

    child.unref();
  }

  public async isRunning() {
    const pid = this.storageConfig.get<string>(StorageKeys.GameExecutablePid);

    if (!pid) {
      return false;
    }

    const list = await find('pid', pid);

    return list.length > 0;
  }
}
