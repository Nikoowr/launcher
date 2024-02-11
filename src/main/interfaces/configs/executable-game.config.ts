export interface ExecutableGameConfig {
  execute(dto: { user: string; password: string }): Promise<void>;
}
