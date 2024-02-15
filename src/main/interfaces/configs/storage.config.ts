export enum StorageKeys {
  GameExecutablePid = 'game-executable-pid',
}

export type StorageDataGameExecutablePid = string;

export type StorageData = StorageDataGameExecutablePid;

export interface StorageConfig {
  set(key: StorageKeys, data: StorageData): void;

  get<T>(key: StorageKeys): T | null;
}
