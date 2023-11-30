import { Check, Download, Search, X } from 'lucide-react';
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

import {
  GameDownloadStatusEnum,
  GameUpdateStatusEnum,
} from '../../main/constants/game.constants';
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

type OnGameFilesChangeProps = {
  status: GameDownloadStatusEnum | GameUpdateStatusEnum;
  currentFilename: string;
  progress: number;
};

const GameContext = createContext<GameContextData>({} as GameContextData);
const { ipcRenderer } = window.electron;

export function GameProvider({ children }: GameProviderProps) {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [status, setStatus] = useState<
    GameDownloadStatusEnum | GameUpdateStatusEnum
  >(GameDownloadStatusEnum.Checking);
  const [fileUpdating, setFileUpdating] = useState('');
  const [readToPlay, setReadToPlay] = useState(false);
  const [progress, setProgress] = useState(0);

  const { loggedIn } = useAuth();

  const statusText = useMemo(() => {
    // Download
    if (status === GameDownloadStatusEnum.Checking) {
      return 'Verificando...';
    }

    if (status === GameDownloadStatusEnum.Downloading) {
      return 'Baixando...';
    }

    if (status === GameDownloadStatusEnum.Extracting) {
      return 'Extraindo...';
    }

    // Update
    if (status === GameUpdateStatusEnum.Checking) {
      return 'Verificando se há atualizações...';
    }

    if (status === GameUpdateStatusEnum.Downloading) {
      return 'Baixando atualizações...';
    }

    if (status === GameUpdateStatusEnum.Updating) {
      return 'Atualizando...';
    }

    if (status === GameUpdateStatusEnum.Done) {
      return 'Tudo certo!';
    }

    return '';
  }, [status]);

  const statusIcon = useMemo(() => {
    if (
      [GameDownloadStatusEnum.Checking, GameUpdateStatusEnum.Checking].includes(
        status,
      )
    ) {
      return <Search className="text-[#fff5]" />;
    }

    if (
      [
        GameDownloadStatusEnum.Downloading,
        GameUpdateStatusEnum.Downloading,
      ].includes(status)
    ) {
      return <Download className="text-[#fff5]" />;
    }

    if (
      [
        GameDownloadStatusEnum.Extracting,
        GameUpdateStatusEnum.Updating,
      ].includes(status)
    ) {
      return <Download className="text-[#fff5]" />;
    }

    if (status === GameUpdateStatusEnum.Done && readToPlay) {
      return <Check className="text-white" />;
    }

    return <X className="text-[#fff5]" />;
  }, [status, readToPlay]);

  const onGameFilesChange = (props: OnGameFilesChangeProps) => {
    const progressValue = Math.floor(props.progress || 0);

    setFileUpdating(progressValue >= 100 ? '' : props.currentFilename || '');
    setProgress(progressValue);
    setStatus(props.status);
    setReadToPlay(false);
  };

  const handleDownload = useCallback(async (props: OnGameFilesChangeProps) => {
    onGameFilesChange(props);

    if (props.status === GameDownloadStatusEnum.Done) {
      setIsDownloaded(true);
    }
  }, []);

  const handleUpdate = useCallback(async (props: OnGameFilesChangeProps) => {
    onGameFilesChange(props);

    if (props.status === GameUpdateStatusEnum.Done) {
      setReadToPlay(true);
    }
  }, []);

  useEffect(() => {
    ipcRenderer.on(IpcEventsEnum.DownloadGame, handleDownload);
  }, [handleDownload]);

  useEffect(() => {
    ipcRenderer.on(IpcEventsEnum.UpdateGame, handleUpdate);
  }, [handleUpdate]);

  // Download useEffect
  useEffect(() => {
    if (loggedIn) {
      ipcRenderer.sendMessage(IpcEventsEnum.DownloadGame);
    }
  }, [loggedIn]);

  // Update useEffect
  useEffect(() => {
    if (loggedIn && isDownloaded) {
      ipcRenderer.sendMessage(IpcEventsEnum.UpdateGame);
    }
  }, [loggedIn, isDownloaded]);

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
