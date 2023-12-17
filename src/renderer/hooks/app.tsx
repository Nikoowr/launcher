import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { IpcEventsEnum } from '../../main/constants/ipc-events.constants';
import { ToastAction } from '../components/ui/toast';
import { useToast } from '../components/ui/use-toast';
import { useLang } from './lang';

type AppProviderProps = {
  children: ReactNode;
};

type AppInfo = {
  version?: string;
};

type AppContextData = {
  updateFound: boolean;
  appInfo: AppInfo;
};

const AppContext = createContext<AppContextData>({} as AppContextData);
const { ipcRenderer } = window.electron;

export function AppProvider({ children }: AppProviderProps) {
  const [updateFound, setUpdateFound] = useState(false);
  const [appInfo, setAppInfo] = useState<AppInfo>({});

  const { dictionary } = useLang();
  const { toast } = useToast();

  const handleUpdateFound = useCallback(() => {
    setUpdateFound(true);

    toast({
      title: dictionary.hooks.app.UPDATE_FOUND_TOAST_TITLE,
      description: dictionary.hooks.app.UPDATE_FOUND_TOAST_DESCRIPTION,
      duration: 1000 * 60 * 60,
      action: (
        <ToastAction
          onClick={() =>
            ipcRenderer.sendMessage(IpcEventsEnum.AutoUpdateQuitAndInstall)
          }
          altText={dictionary.hooks.app.UPDATE_FOUND_TOAST_BUTTON}
        >
          {dictionary.hooks.app.UPDATE_FOUND_TOAST_BUTTON}
        </ToastAction>
      ),
    });
  }, [toast, dictionary]);

  const handleGetAppInfo = useCallback((appInfo: AppInfo = {}) => {
    setAppInfo(appInfo);
  }, []);

  useEffect(() => {
    ipcRenderer.sendMessage(IpcEventsEnum.GetAppInfo);
  }, []);

  useEffect(() => {
    ipcRenderer.once(IpcEventsEnum.AutoUpdaterFoundUpdate, handleUpdateFound);
  }, [handleUpdateFound]);

  useEffect(() => {
    ipcRenderer.once(IpcEventsEnum.GetAppInfo, handleGetAppInfo);
  }, [handleGetAppInfo]);

  const contextValue = useMemo(
    () => ({ updateFound, appInfo }),
    [updateFound, appInfo],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export const useApp = (): AppContextData => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
};
