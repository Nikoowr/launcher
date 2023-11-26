import { Check, Download, Search, Share, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { GameStatusEnum } from '../../main/constants/game.constants';
import { IpcEventsEnum } from '../../main/constants/ipc-events.constants';
import { HomeBackground } from '../components/custom/home-background';
import { Logo } from '../components/custom/logo';
import { PlayButton } from '../components/custom/play-button';
import { RadialProgressBar } from '../components/custom/radial-progress-bar';
import { UserMenu } from '../components/custom/user-menu';
import { Progress } from '../components/ui/progress';

const { ipcRenderer } = window.electron;

export const Home = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(GameStatusEnum.Checking);
  const [fileUpdating, setFileUpdating] = useState('');
  const isDownloading = useMemo(() => progress < 100, [progress]);

  const statusText = useMemo(() => {
    if (status === GameStatusEnum.Checking) {
      return 'Verificando...';
    }

    if (status === GameStatusEnum.Downloading) {
      return 'Baixando...';
    }

    if (status === GameStatusEnum.Extracting) {
      return 'Extraindo...';
    }

    if (status === GameStatusEnum.Done) {
      return 'Tudo certo!';
    }

    return '';
  }, [status]);

  const statusIcon = useMemo(() => {
    if (status === GameStatusEnum.Checking) {
      return <Search className="text-[#fff5]" />;
    }

    if (status === GameStatusEnum.Downloading) {
      return <Download className="text-[#fff5]" />;
    }

    if (status === GameStatusEnum.Extracting) {
      return <Share className="text-[#fff5]" />;
    }

    if (status === GameStatusEnum.Done) {
      return <Check className="text-white" />;
    }

    return <X className="text-[#fff5]" />;
  }, [status]);

  const handleUpdate = useCallback(
    async (props: {
      currentFilename: string;
      status: GameStatusEnum;
      progress: number;
    }) => {
      const progressValue = Math.floor(props.progress || 0);

      setFileUpdating(progressValue >= 100 ? '' : props.currentFilename || '');
      setProgress(progressValue);
      setStatus(props.status);
    },
    [],
  );

  useEffect(() => {
    ipcRenderer[IpcEventsEnum.UpdateGame]();
  }, []);

  useEffect(() => {
    ipcRenderer.on(IpcEventsEnum.UpdateGame, async (props) => {
      console.log('props', props);
      await handleUpdate(props);
    });
  }, [handleUpdate]);

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
