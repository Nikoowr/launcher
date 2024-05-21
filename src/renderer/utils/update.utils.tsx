import { Check, Download, Search, X } from 'lucide-react';
import { JSX } from 'react';

import {
  GameDownloadStatusEnum,
  GameUpdateStatusEnum,
} from '../../main/constants/game.constants';
import { Dictionary } from '../i18n';

export type Dto = {
  dictionary: Dictionary;
  status: string;
};

export const getStatusMessages = ({ dictionary, status }: Dto) => {
  const statusMessages: Record<string, string> = {
    [GameDownloadStatusEnum.Checking]: `${dictionary.hooks.game.GAME_STATUS_CHECKING}...`,
    [GameDownloadStatusEnum.Downloading]: `${dictionary.hooks.game.GAME_STATUS_DOWNLOADING}...`,
    [GameDownloadStatusEnum.Extracting]: `${dictionary.hooks.game.GAME_STATUS_EXTRACTING}...`,
    [GameDownloadStatusEnum.Done]: `${dictionary.hooks.game.GAME_STATUS_CHECKING_UPDATES}...`,
    [GameUpdateStatusEnum.Checking]: `${dictionary.hooks.game.GAME_STATUS_CHECKING_UPDATES}...`,
    [GameUpdateStatusEnum.Downloading]: `${dictionary.hooks.game.GAME_STATUS_DOWNLOADING_UPDATES}...`,
    [GameUpdateStatusEnum.Updating]: `${dictionary.hooks.game.GAME_STATUS_UPDATING}...`,
    [GameUpdateStatusEnum.Extracting]: `${dictionary.hooks.game.GAME_STATUS_EXTRACTING}...`,
    [GameUpdateStatusEnum.Done]: `${dictionary.hooks.game.GAME_STATUS_DONE}!`,
  };

  return statusMessages[status] || '';
};

export const getStatusIcons = ({ status }: Omit<Dto, 'dictionary'>) => {
  const statusIcons: Record<string, JSX.Element> = {
    [GameDownloadStatusEnum.Checking]: <Search className="text-[#fff5]" />,
    [GameUpdateStatusEnum.Checking]: <Search className="text-[#fff5]" />,
    [GameDownloadStatusEnum.Downloading]: <Download className="text-[#fff5]" />,
    [GameUpdateStatusEnum.Downloading]: <Download className="text-[#fff5]" />,
    [GameDownloadStatusEnum.Extracting]: <Download className="text-[#fff5]" />,
    [GameUpdateStatusEnum.Updating]: <Download className="text-[#fff5]" />,
    [GameUpdateStatusEnum.Done]: <Check className="text-[#fff5]" />,
  };

  return statusIcons[status] || <X className="text-[#fff5]" />;
};
