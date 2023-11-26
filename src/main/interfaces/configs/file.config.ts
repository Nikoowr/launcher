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
};

export type UnzipDto = {
  onProgress?: OnProgress;
  destination: string;
  source: string;
};

export type OpenExecutableDto = {
  executable: string;
  directory: string;
  props: string[];
};

export interface FileConfig {
  download(dto: FileConfigDto): Promise<string>;

  read(dto: { filepath: string }): Promise<string>;

  delete(dto: { filepath: string }): Promise<void>;

  gameDirectory(): string;

  unzip(dto: UnzipDto): Promise<void>;

  openExecutable(dto: OpenExecutableDto): Promise<void>;
}
