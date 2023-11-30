import { ChevronDown, PlayCircle } from 'lucide-react';

import { IpcEventsEnum } from '../../../main/constants/ipc-events.constants';
import { useApp } from '../../hooks/app';
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
  const { readToPlay } = useGame();
  const { appInfo } = useApp();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex h-[64px]">
        <Button
          className="flex h-full w-[85%] justify-start rounded-s-full bg-pink-500 py-8 shadow-md hover:bg-pink-600"
          disabled={disabled}
          onClick={() => ipcRenderer.sendMessage(IpcEventsEnum.Play)}
        >
          <div className="right-0 flex rounded-full bg-zinc-800 p-2">
            <PlayCircle />
          </div>

          <span className="ml-3 text-xl font-bold">Jogar</span>
        </Button>
        <Button
          className="m-0 h-full w-[15%] rounded-none bg-pink-900 p-0 hover:bg-pink-950"
          disabled={disabled}
        >
          <ChevronDown size={18} />
        </Button>
      </div>

      <span
        className={cn(
          'self-end text-sm',
          readToPlay ? 'text-white' : 'text-[#fff9]',
        )}
      >
        Versão {appInfo?.version ?? '?'}
      </span>
    </div>
  );
};
