import { HomeBackground } from '../components/custom/home-background';
import { LangSwitcher } from '../components/custom/lang-switcher';
import { Logo } from '../components/custom/logo';
import { PlayButton } from '../components/custom/play-button';
import { UpdateProgress } from '../components/custom/update-progress';
import { UserMenu } from '../components/custom/user-menu';
import { useStage } from '../hooks/stage';
import { useUpdate } from '../hooks/update';

export const Home = () => {
  const { gameIsRunning } = useStage();
  const { isUpToDate } = useUpdate();

  return (
    <main className="flex h-[100vh] flex-col justify-between p-10">
      <HomeBackground />

      <div className="absolute right-4 mt-4 flex gap-4">
        <LangSwitcher
          className="titlebar-button bg-[#fff2] p-4 hover:bg-[#fff4]"
          disabled={!isUpToDate || gameIsRunning}
          variant="default"
        />
        <UserMenu disabled={!isUpToDate || gameIsRunning} />
      </div>

      <div>
        <div className="mt-10 flex">
          <Logo className="w-[250px]" iconClassName="text-white" />
        </div>

        <PlayButton className="mt-8 w-[170px]" disabled={!isUpToDate} />
      </div>

      <div className="flex w-full items-center gap-4 rounded-md bg-[#0008] p-6 shadow-sm">
        <UpdateProgress />
      </div>
    </main>
  );
};
