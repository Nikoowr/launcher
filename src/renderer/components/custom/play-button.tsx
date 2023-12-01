import { PlayCircle } from 'lucide-react';

import { IpcEventsEnum } from '../../../main/constants/ipc-events.constants';
import { useGame } from '../../hooks/game';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

type PlayButtonProps = {
  className?: string;
  disabled?: boolean;
};

const { ipcRenderer } = window.electron;

export const PlayButton = ({
  className = '',
  disabled = false,
}: PlayButtonProps) => {
  const { readToPlay, gameInfo } = useGame();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex h-[64px]">
        <Button
          className="flex h-full w-[100%] justify-start rounded-s-full rounded-ee-full bg-pink-500 py-8 shadow-md hover:bg-pink-600"
          disabled={disabled}
          onClick={() => ipcRenderer.sendMessage(IpcEventsEnum.Play)}
        >
          <div className="right-0 flex rounded-full bg-black p-2">
            <PlayCircle width={24} height={24} />
          </div>

          <span className="ml-3 text-xl font-bold">Jogar</span>
        </Button>
        {/* <Button
          className="m-0 h-full w-[15%] rounded-none bg-pink-900 p-0 hover:bg-pink-950"
          disabled={disabled}
        >
          <ChevronDown size={18} />
        </Button> */}
      </div>

      <span
        className={cn(
          'self-end text-sm',
          readToPlay ? 'text-[#eee]' : 'text-[#fff9]',
        )}
      >
        Versão do jogo: {gameInfo?.version ?? '?'}
      </span>
    </div>
  );
};
