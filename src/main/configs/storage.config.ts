import Store from 'electron-store';

import {
  StorageConfig as StorageConfigInterface,
  StorageData,
  StorageKeys,
} from '../interfaces';

export class StorageConfig implements StorageConfigInterface {
  private readonly storage: Store;

  constructor() {
    this.storage = new Store();
  }

  public set(key: StorageKeys, data: StorageData): void {
    return this.storage.set(key, data);
  }

  public get<T>(key: StorageKeys): T | null {
    return (this.storage.get(key) as T) || null;
  }
}
