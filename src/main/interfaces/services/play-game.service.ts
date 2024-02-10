import { ApplicationStatus } from '../models/status.model';

export type PlayGameServiceDto = {
  currentGameVersion: string;
};

export interface PlayGameService {
  execute(dto: PlayGameServiceDto): Promise<ApplicationStatus>;
}
