import { PlayCircle } from 'lucide-react';
import { useState } from 'react';

import { IpcEventsEnum } from '../../../main/constants/ipc-events.constants';
import { useGame } from '../../hooks/game';
import { useLang } from '../../hooks/lang';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Icons } from './icons';

type PlayButtonProps = {
  className?: string;
  disabled?: boolean;
};

const { ipcRenderer } = window.electron;

export const PlayButton = ({
  className = '',
  disabled = false,
}: PlayButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { readToPlay, gameInfo } = useGame();
  const { dictionary } = useLang();

  const play = async () => {
    console.log('play');
    setLoading(true);

    await new Promise((resolve) => {
      ipcRenderer.once(IpcEventsEnum.Play, resolve);
      ipcRenderer.sendMessage(IpcEventsEnum.Play);
    }).finally(() => setLoading(false));

    console.log('after');
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex h-[64px]">
        <Button
          className="flex h-full w-[100%] justify-start rounded-s-full rounded-ee-full bg-pink-500 py-8 shadow-md hover:bg-pink-600"
          disabled={disabled}
          onClick={play}
        >
          <div className="right-0 flex rounded-full bg-black p-2">
            {loading ? (
              <Icons.spinner className="h-[24px] w-[24px] animate-spin" />
            ) : (
              <PlayCircle width={24} height={24} />
            )}
          </div>

          <span className="ml-3 text-xl font-bold">
            {dictionary.components.custom['play-button'].PLAY}
          </span>
        </Button>
        {/* <Button
          className="m-0 h-full w-[15%] rounded-none bg-pink-900 p-0 hover:bg-pink-950"
          disabled={disabled}
        >
          <ChevronDown size={18} />
        </Button> */}
      </div>

      {gameInfo?.version && (
        <span
          className={cn(
            'self-end text-sm',
            readToPlay ? 'text-[#eee]' : 'text-[#fff9]',
          )}
        >
          {dictionary.components.custom['play-button'].GAME_VERSION}{' '}
          {gameInfo?.version}
        </span>
      )}
    </div>
  );
};
