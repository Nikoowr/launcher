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

type Session = {
  user?: string;
};

type AuthContextData = {
  login: (credentials: Credentials) => void;
  sessionLoading: boolean;
  logout: () => void;
  loggedIn: boolean;
  session: Session;
  loading: boolean;
  error: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const { ipcRenderer } = window.electron;

export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [sessionLoading, setSessionLoading] = useState(true);
  const [session, setSession] = useState<Session>({});

  const { toast } = useToast();

  const login = useCallback((credentials: Credentials) => {
    setLoading(true);
    setError(false);
    ipcRenderer.sendMessage(IpcEventsEnum.SignIn, credentials);
  }, []);

  const logout = useCallback(() => {
    ipcRenderer.sendMessage(IpcEventsEnum.SignOut);
  }, []);

  const handleSession = useCallback((session?: Session) => {
    setLoggedIn(!!session?.user);
    setSession(session || {});
    setSessionLoading(false);
  }, []);

  const handleSignIn = useCallback(
    async (session?: Session) => {
      try {
        handleSession(session);
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
    },
    [toast, handleSession],
  );

  // Sign in / Sign out useEffects
  useEffect(() => {
    ipcRenderer.on(IpcEventsEnum.SignIn, async (dto?: Session) => {
      await handleSignIn(dto);
    });
  }, [handleSignIn]);

  useEffect(() => {
    ipcRenderer.on(IpcEventsEnum.SignOut, () => {
      setLoggedIn(false);
    });
  }, []);

  // Session useEffects
  useEffect(() => {
    ipcRenderer.sendMessage(IpcEventsEnum.GetUserSession);
  }, []);

  useEffect(() => {
    ipcRenderer.on(IpcEventsEnum.GetUserSession, handleSession);
  }, [handleSession]);

  const contextValue = useMemo(
    () => ({
      sessionLoading,
      loggedIn,
      loading,
      session,
      logout,
      login,
      error,
    }),
    [sessionLoading, loggedIn, loading, session, logout, login, error],
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
