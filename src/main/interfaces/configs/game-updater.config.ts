export type GameUpdaterConfigCheckForUpdatesResponse = {
  versions: string[];
  updatedAt: string;
  latest: string;
};

export type GameUpdaterConfigGetGameDataFileListResponse = {
  totalFilesChanged: number;
  fileChanges: string[];
  createdAt: string;
};

export interface GameUpdaterConfig {
  getPatchInfo(): Promise<GameUpdaterConfigCheckForUpdatesResponse | null>;

  getGameDataFileList({
    version,
  }: {
    version: string;
  }): Promise<GameUpdaterConfigGetGameDataFileListResponse | null>;
}
