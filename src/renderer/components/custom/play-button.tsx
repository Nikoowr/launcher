import { ChevronDown, PlayCircle } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';

type PlayButtonProps = {
  className?: string;
};

export const PlayButton = ({ className = '' }: PlayButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(true);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex h-[64px]">
        <Button
          className="flex h-full w-[85%] justify-start rounded-s-full bg-pink-500 py-8 shadow-md hover:bg-pink-600"
          disabled={isDownloading}
        >
          <div className="right-0 flex rounded-full bg-zinc-800 p-2">
            <PlayCircle />
          </div>

          <span className="ml-3 text-xl font-bold">Jogar</span>
        </Button>
        <Button
          className="m-0 h-full w-[15%] rounded-none bg-pink-900 p-0 hover:bg-pink-950"
          disabled={isDownloading}
        >
          <ChevronDown />
        </Button>
      </div>

      <span className="self-end text-sm text-white">Versão 0.0.1</span>
    </div>
  );
};
