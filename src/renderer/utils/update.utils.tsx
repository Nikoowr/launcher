import { Download, Search } from 'lucide-react';

import {
  GameDownloadStatusEnum,
  GameUpdateStatusEnum,
} from '../../main/constants/game.constants';
import { Dictionary } from '../i18n';

export const statusMessages = (dictionary: Dictionary) => {
  return {
    [GameDownloadStatusEnum.Checking]: `${dictionary.hooks.game.GAME_STATUS_CHECKING}...`,
    [GameDownloadStatusEnum.Downloading]: `${dictionary.hooks.game.GAME_STATUS_DOWNLOADING}...`,
    [GameDownloadStatusEnum.Extracting]: `${dictionary.hooks.game.GAME_STATUS_EXTRACTING}...`,
    [GameUpdateStatusEnum.Checking]: `${dictionary.hooks.game.GAME_STATUS_CHECKING_UPDATES}...`,
    [GameUpdateStatusEnum.Downloading]: `${dictionary.hooks.game.GAME_STATUS_DOWNLOADING_UPDATES}...`,
    [GameUpdateStatusEnum.Updating]: `${dictionary.hooks.game.GAME_STATUS_UPDATING}...`,
    [GameUpdateStatusEnum.Done]: `${dictionary.hooks.game.GAME_STATUS_DONE}!`,
  };
};

export const statusIcons = () => {
  return {
    [GameDownloadStatusEnum.Checking]: <Search className="text-[#fff5]" />,
    [GameUpdateStatusEnum.Checking]: <Search className="text-[#fff5]" />,
    [GameDownloadStatusEnum.Downloading]: <Download className="text-[#fff5]" />,
    [GameUpdateStatusEnum.Downloading]: <Download className="text-[#fff5]" />,
    [GameDownloadStatusEnum.Extracting]: <Download className="text-[#fff5]" />,
    [GameUpdateStatusEnum.Updating]: <Download className="text-[#fff5]" />,
  };
};
