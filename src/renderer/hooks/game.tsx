import { Check, Download, Search, Share, X } from 'lucide-react';
import {
  JSX,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { GameStatusEnum } from '../../main/constants/game.constants';
import { IpcEventsEnum } from '../../main/constants/ipc-events.constants';
import { useAuth } from './auth';

type GameProviderProps = {
  children: ReactNode;
};

type GameContextData = {
  statusIcon: JSX.Element;
  fileUpdating: string;
  statusText: string;
  progress: number;
  readToPlay: boolean;
};

const GameContext = createContext<GameContextData>({} as GameContextData);
const { ipcRenderer } = window.electron;

export function GameProvider({ children }: GameProviderProps) {
  const [status, setStatus] = useState(GameStatusEnum.Checking);
  const [fileUpdating, setFileUpdating] = useState('');
  const [readToPlay, setReadToPlay] = useState(false);
  const [progress, setProgress] = useState(0);

  const { loggedIn } = useAuth();

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

    // if (status === GameStatusEnum.CheckingUpdates) {
    //   return 'Verificando atualizações...';
    // }

    // if (status === GameStatusEnum.Updating) {
    //   return 'Atualizando...';
    // }

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

  const handleDownload = useCallback(
    async (props: {
      currentFilename: string;
      status: GameStatusEnum;
      progress: number;
    }) => {
      const progressValue = Math.floor(props.progress || 0);

      setFileUpdating(progressValue >= 100 ? '' : props.currentFilename || '');
      setProgress(progressValue);
      setStatus(props.status);

      if (props.status === GameStatusEnum.Done) {
        setReadToPlay(true);
      }
    },
    [],
  );

  useEffect(() => {
    if (loggedIn) {
      ipcRenderer[IpcEventsEnum.UpdateGame]();
    }
  }, [loggedIn]);

  useEffect(() => {
    ipcRenderer.on(IpcEventsEnum.UpdateGame, handleDownload);
  }, [handleDownload]);

  const contextValue = useMemo(
    () => ({ statusIcon, readToPlay, fileUpdating, statusText, progress }),
    [statusIcon, readToPlay, fileUpdating, statusText, progress],
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}

export const useGame = (): GameContextData => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within an GameProvider');
  }

  return context;
};
