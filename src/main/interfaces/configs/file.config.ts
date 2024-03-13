type OnProgressDto = {
  progress: number;
  filename?: string;
};

export type OnProgress = (dto: OnProgressDto) => void;

export type FileConfigDto = {
  onProgress?: OnProgress;
  directory: string;
  filename: string;
  url: string;
  id: string;
};

export type FileConfigWriteDto = {
  directory: string;
  filename: string;
  data: string;
};

export type FileConfigUnzipDto = {
  onProgress?: OnProgress;
  destination: string;
  source: string;
};

export type FileConfigOpenExecutableDto = {
  executable: string;
  directory: string;
  props: string[];
};

export interface FileConfig {
  gameTranslateDirectory: string;
  adminConfigDirectory: string;
  resourcesDirectory: string;
  userDataDirectory: string;
  gameDirectory: string;
  i18nDirectory: string;
  MAC: string;

  download(dto: FileConfigDto): Promise<string>;

  read(dto: { directory: string; filename: string }): string | null;

  write(dto: FileConfigWriteDto): Promise<string>;

  delete(dto: { directory: string; filename: string }): Promise<void>;

  unzip(dto: FileConfigUnzipDto): Promise<void>;

  openExecutable(dto: FileConfigOpenExecutableDto): Promise<void>;

  getAssetPath(asset: string): string;

  copyFolderWithOverwrite(dto: { src: string; dest: string }): Promise<void>;

  joinPaths(paths: string[]): string;
}
