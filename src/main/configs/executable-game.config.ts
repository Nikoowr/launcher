import { spawn } from 'node:child_process';

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
    console.log('[ExecutableGameConfig] Executing game...');

    const executablePath = this.fileConfig.joinPaths([
      this.fileConfig.gameDirectory,
      'GrandFantasia.exe',
    ]);

    console.log(`[ExecutableGameConfig] Executable path: ${executablePath}`);

    const args = ['EasyFun', '-a', user, '-p', password];

    console.log('[ExecutableGameConfig] Creating process...');

    const child = spawn(executablePath, args, {
      cwd: this.fileConfig.gameDirectory,
      detached: true,
    });

    console.log('[ExecutableGameConfig] Created!');

    if (child.pid) {
      console.log('[ExecutableGameConfig] Saving pid...');
      this.storageConfig.set(StorageKeys.GameExecutablePid, String(child.pid));
    }

    console.log('[ExecutableGameConfig] Child unref...');
    child.unref();
    console.log('[ExecutableGameConfig] Child complete!');
  }
}
