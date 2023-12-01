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

  const { toast } = useToast();

  const handleUpdateFound = useCallback(() => {
    setUpdateFound(true);

    toast({
      title: 'Nova versão disponível',
      description:
        'Uma nova versão do Launcher está disponível. Atualize agora para obter as últimas melhorias!',
      duration: 1000 * 60 * 60,
      action: (
        <ToastAction
          onClick={() =>
            ipcRenderer.sendMessage(IpcEventsEnum.AutoUpdateQuitAndInstall)
          }
          altText="Atualizar"
        >
          Atualizar
        </ToastAction>
      ),
    });
  }, [toast]);

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
