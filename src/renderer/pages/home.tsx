import { HomeBackground } from '../components/custom/home-background';
import { Logo } from '../components/custom/logo';
import { PlayButton } from '../components/custom/play-button';
import { RadialProgressBar } from '../components/custom/radial-progress-bar';
import { UserMenu } from '../components/custom/user-menu';
import { Progress } from '../components/ui/progress';
import { useGame } from '../hooks/game';

export const Home = () => {
  const { readToPlay, fileUpdating, progress, statusIcon, statusText } =
    useGame();

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

        <PlayButton className="mt-8 w-[170px]" disabled={!readToPlay} />
      </div>

      <div className="flex w-full items-center gap-4 rounded-md bg-[#0008] p-6 shadow-sm">
        <RadialProgressBar className="size-20" value={progress}>
          {statusIcon}
        </RadialProgressBar>

        <div className="flex flex-1 flex-col gap-2  text-white">
          <div>
            <span className="text-2xl font-bold">{progress}%</span>
            <span className="ml-4 text-lg text-[#fff9]">{statusText}</span>
          </div>
          <Progress value={progress} className="w-full" />
          <span className="h-5 text-sm text-[#fff5]">{fileUpdating}</span>
        </div>
      </div>
    </main>
  );
};
