export type UnzipConfigDto = {
  onProgress: (dto: { progress: number; filename?: string }) => void;
  destination: string;
  source: string;
};

export interface UnzipConfig {
  unzip(dto: UnzipConfigDto): Promise<void>;
}
