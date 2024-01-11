import { GameStatusEnum } from '../../constants/api.constants';

export type Status = {
  game: {
    status: GameStatusEnum;
  };
};
