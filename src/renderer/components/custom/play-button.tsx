import { PlayCircle } from 'lucide-react';

import { ApplicationStatusType } from '../../../main/interfaces';
import { useGame } from '../../hooks/game';
import { useLang } from '../../hooks/lang';
import { useStage } from '../../hooks/stage';
import { cn } from '../../lib/utils';
import * as gameUtils from '../../utils/game.utils';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { Icons } from './icons';

type PlayButtonProps = {
  className?: string;
  disabled?: boolean;
};

export const PlayButton = ({
  disabled = false,
  className = '',
}: PlayButtonProps) => {
  const { readToPlay } = useGame();
  const { gameVersion, gameIsRunning, setGameIsRunning } = useStage();
  const { dictionary: langDictionary, lang, loading: langLoading } = useLang();
  const dictionary = langDictionary.components.custom['play-button'];

  const play = async () => {
    setGameIsRunning(true);

    const response = await gameUtils.play({
      currentGameVersion: gameVersion || 'v0.0.0',
    });

    setGameIsRunning(false);

    if (!response.available) {
      const title = response.data?.title
        ? response.data?.title[lang] || 'Error'
        : 'Unknown Error';

      const description = response.data?.description
        ? response.data?.description[lang]
        : undefined;

      return toast({
        title,
        description,
        duration: 5000,
        variant:
          response.type === ApplicationStatusType.Error
            ? 'destructive'
            : 'default',
      });
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex h-[64px]">
        <Button
          className="flex h-full w-[100%] justify-start rounded-s-full rounded-ee-full bg-pink-500 py-8 shadow-md hover:bg-pink-600"
          disabled={disabled || gameIsRunning || langLoading}
          onClick={play}
        >
          <div className="right-0 flex rounded-full bg-black p-2">
            {gameIsRunning ? (
              <Icons.spinner className="size-[24px] animate-spin" />
            ) : (
              <PlayCircle width={24} height={24} />
            )}
          </div>

          <span className="ml-3 text-xl font-bold">{dictionary.PLAY}</span>
        </Button>
        {/* <Button
          className="m-0 h-full w-[15%] rounded-none bg-pink-900 p-0 hover:bg-pink-950"
          disabled={disabled}
        >
          <ChevronDown size={18} />
        </Button> */}
      </div>

      {gameVersion && (
        <span
          className={cn(
            'self-end text-sm',
            readToPlay ? 'text-[#eee]' : 'text-[#fff9]',
          )}
        >
          {dictionary.GAME_VERSION} {gameVersion}
        </span>
      )}
    </div>
  );
};
