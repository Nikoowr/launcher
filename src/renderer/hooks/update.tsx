import { IconNode, X } from 'lucide-react';
import {
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
import { statusIcons, statusMessages } from '../utils/update.utils';
import { useAuth } from './auth';
import { useLang } from './lang';

type GameProviderProps = {
  children: ReactNode;
};

type UpdateInfo = {
  status: GameUpdateStatusEnum;
  fileUpdating: string;
  progress: number;
};

type UpdateContextData = {
  updateInfo: UpdateInfo;
  clientVersion: string;
  isUpToDate: boolean;
  isUpdating: boolean;
};

type OnFileChanges = {
  status: GameUpdateStatusEnum;
  icon?: IconNode;
  currentFilename: string;
  progress: number;
};

const UpdateContext = createContext<UpdateContextData>({} as UpdateContextData);

const { ipcRenderer } = window.electron;

export function UpdateProvider({ children }: GameProviderProps) {
  const [clientVersion, setClientVersion] = useState('v0.0.0');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpToDate, setIsUpToDate] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({} as UpdateInfo);
  const [touched, setTouched] = useState(false);

  const { dictionary } = useLang();
  const { loggedIn } = useAuth();

  const handleUpdate = useCallback(async () => {
    setTouched(true);

    const updates = await checkForUpdates();

    if (!updates) {
      return;
    }

    setIsUpToDate(false);

    if (updates.client) {
      ipcRenderer.sendMessage(IpcEventsEnum.DownloadLatestUpdates);
    }
  }, []);

  const onFileChange = useCallback(
    async (props: OnFileChanges) => {
      setIsUpdating(true);

      const progressValue = Math.floor(props.progress || 0);

      setUpdateInfo((oldState) => ({
        ...oldState,
        fileUpdating: progressValue >= 100 ? '' : props.currentFilename || '',
        progress: progressValue,
        status: statusMessages(dictionary)[props.status] || oldState.status,
        icon: statusIcons()[props.status] || <X className="text-[#fff5]" />,
      }));

      if (props.status === GameUpdateStatusEnum.Done) {
        const { version } = await getGameInfo();
        setClientVersion(version || 'v0.0.0');
      }
    },
    [dictionary],
  );

  useEffect(() => {
    if (loggedIn && !touched) {
      handleUpdate();
    }
  }, [loggedIn, handleUpdate, touched]);

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
