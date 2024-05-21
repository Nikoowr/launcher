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

import { GameUpdateStatusEnum } from '../../main/constants/game.constants';
import { IpcEventsEnum } from '../../main/constants/ipc-events.constants';
import { checkForUpdates, getGameInfo } from '../services/ipc';
import { getStatusIcons, getStatusMessages } from '../utils/update.utils';
import { useAuth } from './auth';
import { useDownload } from './download';
import { useLang } from './lang';

type GameProviderProps = {
  children: ReactNode;
};

type UpdateInfo = {
  statusIcon: JSX.Element;
  statusMessage: string;
  progress: number;
  file: string;
};

type UpdateContextData = {
  updateInfo: UpdateInfo;
  clientVersion: string;
  isUpToDate: boolean;
  isUpdating: boolean;
};

type OnFileChanges = {
  currentFilename: string;
  icon?: JSX.Element;
  progress: number;
  status: string;
};

const UpdateContext = createContext<UpdateContextData>({} as UpdateContextData);

const { ipcRenderer } = window.electron;

export function UpdateProvider({ children }: GameProviderProps) {
  const [clientVersion, setClientVersion] = useState('v0.0.0');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpToDate, setIsUpToDate] = useState(false);
  const [touched, setTouched] = useState(false);

  const { isDownloaded } = useDownload();
  const { dictionary } = useLang();
  const { loggedIn } = useAuth();

  const [updateInfo, setUpdateInfo] = useState({
    statusIcon: getStatusIcons({ status: GameUpdateStatusEnum.Checking }),
    statusMessage: getStatusMessages({
      status: GameUpdateStatusEnum.Checking,
      dictionary,
    }),
    progress: 0,
    file: '',
  } as UpdateInfo);

  const shouldLookForUpdates = useMemo(
    () => loggedIn && isDownloaded && !touched,
    [loggedIn, isDownloaded, touched],
  );

  const onUpToDate = useCallback(async () => {
    const { version } = await getGameInfo();

    setClientVersion(version || 'v0.0.0');
    setIsUpdating(false);
    setIsUpToDate(true);

    setUpdateInfo({
      statusIcon: getStatusIcons({ status: GameUpdateStatusEnum.Done }),
      statusMessage: getStatusMessages({
        status: GameUpdateStatusEnum.Done,
        dictionary,
      }),
      progress: 100,
      file: '',
    });
  }, [dictionary]);

  const handleUpdate = useCallback(async () => {
    setTouched(true);

    const updates = await checkForUpdates();

    if (!updates?.client) {
      onUpToDate();
    }

    setIsUpToDate(false);

    if (updates.client) {
      ipcRenderer.sendMessage(IpcEventsEnum.DownloadLatestUpdates);
    }
  }, [onUpToDate]);

  const onFileChange = useCallback(
    async (props: OnFileChanges) => {
      setIsUpdating(true);

      const progressValue = Math.floor(props?.progress || 0);

      setUpdateInfo((oldState) => ({
        ...oldState,
        progress: progressValue,
        file: progressValue >= 100 ? '' : props?.currentFilename || '',
        statusMessage:
          getStatusMessages({ dictionary, status: props?.status }) ||
          oldState.statusMessage,
        statusIcon:
          getStatusIcons({ status: props?.status }) || oldState?.statusIcon,
      }));

      if (props?.status === GameUpdateStatusEnum.Done) {
        await onUpToDate();
      }
    },
    [dictionary, onUpToDate],
  );

  useEffect(() => {
    if (shouldLookForUpdates) {
      handleUpdate();
    }
  }, [shouldLookForUpdates, handleUpdate]);

  useEffect(() => {
    ipcRenderer.on(IpcEventsEnum.DownloadLatestUpdates, onFileChange);
  }, [onFileChange]);

  const contextValue: UpdateContextData = useMemo(
    () => ({ updateInfo, clientVersion, isUpdating, isUpToDate }),
    [updateInfo, clientVersion, isUpdating, isUpToDate],
  );

  return (
    <UpdateContext.Provider value={contextValue}>
      {children}
    </UpdateContext.Provider>
  );
}

export const useUpdate = (): UpdateContextData => {
  const context = useContext(UpdateContext);

  if (!context) {
    throw new Error('useUpdate must be used within an UpdateProvider');
  }

  return context;
};
