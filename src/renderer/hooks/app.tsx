import {
  ReactNode,
  createContext,
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

type AppContextData = {
  updateFound: boolean;
};

const AppContext = createContext<AppContextData>({} as AppContextData);
const { ipcRenderer } = window.electron;

export function AppProvider({ children }: AppProviderProps) {
  const [updateFound, setUpdateFound] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    ipcRenderer.once(IpcEventsEnum.AutoUpdaterFoundUpdate, () => {
      setUpdateFound(true);

      toast({
        title: 'Nova versão disponível',
        description:
          'Uma nova versão do Launcher está disponível. Atualize agora para obter as últimas melhorias!',
        duration: 1000 * 60 * 60,
        action: (
          <ToastAction
            onClick={ipcRenderer[IpcEventsEnum.AutoUpdateQuitAndInstall]}
            altText="Atualizar"
          >
            Atualizar
          </ToastAction>
        ),
      });
    });
  }, [toast]);

  useEffect(() => {}, []);

  const contextValue = useMemo(() => ({ updateFound }), [updateFound]);

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
