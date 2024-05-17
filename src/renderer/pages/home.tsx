import { HomeBackground } from '../components/custom/home-background';
import { LangSwitcher } from '../components/custom/lang-switcher';
import { Logo } from '../components/custom/logo';
import { PlayButton } from '../components/custom/play-button';
import { RadialProgressBar } from '../components/custom/radial-progress-bar';
import { UpdateProgress } from '../components/custom/update-progress';
import { UserMenu } from '../components/custom/user-menu';
import { Progress } from '../components/ui/progress';
import { useGame } from '../hooks/game';
import { useStage } from '../hooks/stage';

export const Home = () => {
  const { readToPlay, fileUpdating, progress, statusIcon, statusText } =
    useGame();
  const { gameIsRunning } = useStage();

  return (
    <main className="flex h-[100vh] flex-col justify-between p-10">
      <HomeBackground />

      <div className="absolute right-4 mt-4 flex gap-4">
        <LangSwitcher
          className="titlebar-button bg-[#fff2] p-4 hover:bg-[#fff4]"
          disabled={!readToPlay || gameIsRunning}
          variant="default"
        />
        <UserMenu disabled={!readToPlay || gameIsRunning} />
      </div>

      <div>
        <div className="mt-10 flex">
          <Logo className="w-[250px]" iconClassName="text-white" />
        </div>

        <PlayButton className="mt-8 w-[170px]" disabled={!readToPlay} />
      </div>

      <div className="flex w-full items-center gap-4 rounded-md bg-[#0008] p-6 shadow-sm">
        <UpdateProgress />
      </div>
    </main>
  );
};
