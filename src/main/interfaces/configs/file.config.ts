export type FileConfigDto = {
  directory: string;
  filename: string;
  url: string;
};

export interface FileConfig {
  download(dto: FileConfigDto): Promise<string>;

  read(dto: { filepath: string }): Promise<string>;

  gameDirectory(): string;
}
