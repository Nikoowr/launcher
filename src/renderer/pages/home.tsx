import { Check, Download } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { HomeBackground } from '../components/custom/home-background';
import { Logo } from '../components/custom/logo';
import { PlayButton } from '../components/custom/play-button';
import { RadialProgressBar } from '../components/custom/radial-progress-bar';
import { UserMenu } from '../components/custom/user-menu';
import { Progress } from '../components/ui/progress';

export const Home = () => {
  const [progress, setProgress] = useState(0);
  const isDownloading = useMemo(() => progress < 100, [progress]);

  useEffect(() => {
    if (progress < 100) {
      new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
        setProgress(Math.min(100, progress + 1));
      });
    }
  }, [progress]);

  return (
    <main className="flex h-[100vh] flex-col justify-between p-10">
      <HomeBackground />

      <div className="absolute right-4 mt-4">
        <UserMenu />
      </div>

      <div>
        <div className="mt-10 flex">
          <Logo className="w-[250px]" iconClassName="text-white" />
        </div>

        <PlayButton className="mt-8 w-[170px]" disabled={isDownloading} />
      </div>

      <div className="flex w-full items-center gap-4 rounded-md bg-[#0008] p-6 shadow-sm">
        <RadialProgressBar className="h-20 w-20" value={progress}>
          {isDownloading ? (
            <Download className="text-[#fff5]" />
          ) : (
            <Check className="text-white" />
          )}
        </RadialProgressBar>

        <div className="flex flex-1 flex-col gap-2  text-white">
          <div>
            <span className="text-2xl font-bold">{progress}%</span>
            <span className="ml-4 text-lg text-[#fff9]">
              {isDownloading ? 'Baixando...' : 'Completo!'}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </div>
    </main>
  );
};
