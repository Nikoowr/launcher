import { UserRolesEnum } from '../../../constants/user.constants';
import { ApplicationStatus } from '../models/status.model';

export type PlayGameServiceDto = {
  currentGameVersion: string;
  accessToken: string;
  userRole: UserRolesEnum;
};

export interface PlayGameService {
  execute(dto: PlayGameServiceDto): Promise<ApplicationStatus>;
}
