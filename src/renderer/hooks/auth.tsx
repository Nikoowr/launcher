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
import { useToast } from '../components/ui/use-toast';

type AuthProviderProps = {
  children: ReactNode;
};

type Credentials = {
  password: string;
  user: string;
};

type AuthContextData = {
  login: (credentials: Credentials) => void;
  logout: () => void;
  recoverLoginLoading: boolean;
  loggedIn: boolean;
  loading: boolean;
  error: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const { ipcRenderer } = window.electron;

export function AuthProvider({ children }: AuthProviderProps) {
  const [recoverLoginLoading, setRecoverLoginLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { toast } = useToast();

  const login = useCallback((credentials: Credentials) => {
    setLoading(true);
    setError(false);
    ipcRenderer[IpcEventsEnum.SignIn](credentials);
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
  }, []);

  const handleSignIn = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoggedIn(true);
    } catch (error) {
      setError(true);

      toast({
        variant: 'destructive',
        title: 'Erro no login',
        description:
          'Ocorreu um erro ao realizar login, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const isLoggedIn = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return true;
  }, []);

  useEffect(() => {
    ipcRenderer.on(IpcEventsEnum.SignIn, async () => {
      await handleSignIn();
    });
  }, [handleSignIn]);

  useEffect(() => {
    isLoggedIn()
      .then((logged) => setLoggedIn(logged))
      .catch(() => setLoggedIn(false))
      .finally(() => setRecoverLoginLoading(false));
  }, [isLoggedIn]);

  const contextValue = useMemo(
    () => ({ login, logout, loading, recoverLoginLoading, loggedIn, error }),
    [login, logout, loading, recoverLoginLoading, loggedIn, error],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
