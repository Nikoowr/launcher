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

import { GameDownloadStatusEnum } from '../../main/constants/game.constants';
import { IpcEventsEnum } from '../../main/constants/ipc-events.constants';
import { getStatusIcons, getStatusMessages } from '../utils/update.utils';
import { useAuth } from './auth';
import { useLang } from './lang';

type GameProviderProps = {
  children: ReactNode;
};

type DownloadInfo = {
  statusIcon: JSX.Element;
  statusMessage: string;
  progress: number;
  file: string;
};

type DownloadContextData = {
  downloadInfo: DownloadInfo;
  isDownloaded: boolean;
  isDownloading: boolean;
};

type OnFileChanges = {
  currentFilename: string;
  icon?: JSX.Element;
  progress: number;
  status: string;
};

const DownloadContext = createContext<DownloadContextData>(
  {} as DownloadContextData,
);
const { ipcRenderer } = window.electron;

export function DownloadProvider({ children }: GameProviderProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const { dictionary } = useLang();
  const { loggedIn } = useAuth();

  const [downloadInfo, setDownloadInfo] = useState({
    statusIcon: getStatusIcons({ status: GameDownloadStatusEnum.Checking }),
    statusMessage: getStatusMessages({
      status: GameDownloadStatusEnum.Checking,
      dictionary,
    }),
    progress: 0,
    file: '',
  } as DownloadInfo);

  const onFileChange = useCallback(
    async (props: OnFileChanges) => {
      setIsDownloading(true);

      const progressValue = Math.floor(props?.progress || 0);

      setDownloadInfo((oldState) => ({
        ...oldState,
        file: progressValue >= 100 ? '' : props?.currentFilename || '',
        progress: progressValue,
        statusMessage:
          getStatusMessages({ dictionary, status: props?.status }) ||
          oldState?.statusMessage,
        statusIcon:
          getStatusIcons({ status: props?.status }) || oldState?.statusIcon,
      }));

      if (props?.status === GameDownloadStatusEnum.Done) {
        setIsDownloading(false);
        setIsDownloaded(true);
      }
    },
    [dictionary],
  );

  useEffect(() => {
    if (loggedIn) {
      ipcRenderer.sendMessage(IpcEventsEnum.DownloadGame);
      ipcRenderer.on(IpcEventsEnum.DownloadGame, onFileChange);
    }
  }, [loggedIn, onFileChange]);

  const contextValue = useMemo(
    () => ({
      isDownloading,
      isDownloaded,
      downloadInfo,
    }),
    [isDownloaded, isDownloading, downloadInfo],
  );

  return (
    <DownloadContext.Provider value={contextValue}>
      {children}
    </DownloadContext.Provider>
  );
}

export const useDownload = (): DownloadContextData => {
  const context = useContext(DownloadContext);

  if (!context) {
    throw new Error('useDownload must be used within an DownloadProvider');
  }

  return context;
};
