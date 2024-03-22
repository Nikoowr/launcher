import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { toast } from '../components/ui/use-toast';
import { api } from '../services/api/functions';
import { sessionUtils } from '../services/api/utils';

type AuthProviderProps = {
  children: ReactNode;
};

type Credentials = {
  password: string;
  email: string;
};

type LoginOptions = {
  error?: {
    description?: string;
    title: string;
  };
};

type AuthContextData = {
  login: (credentials: Credentials, options?: LoginOptions) => Promise<void>;
  logout: () => Promise<void>;
  sessionLoading: boolean;
  accessToken?: string;
  loggedIn: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<undefined | string>(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sessionLoading, setSessionLoading] = useState(true);

  const logout = useCallback(async () => {
    await sessionUtils.deleteSession();
    setLoggedIn(false);
  }, []);

  const handleSession = useCallback(async () => {
    setSessionLoading(true);

    try {
      const session = await sessionUtils.getSession();

      setAccessToken(session?.accessToken);
      setLoggedIn(!!session);
    } catch (error) {
      await logout();
    } finally {
      setSessionLoading(false);
    }
  }, [logout]);

  const login = useCallback(
    async (credentials: Credentials, options?: LoginOptions) => {
      const { error } = options || {};

      try {
        setLoading(true);
        const session = await api.createSession(credentials);
        await sessionUtils.saveSession({ session });
        await handleSession();
      } catch {
        if (error) {
          toast({
            title: error.title,
            description: error.description,
            variant: 'destructive',
            type: 'foreground',
            duration: 5000,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [handleSession],
  );

  useEffect(() => {
    handleSession();
  }, [handleSession]);

  const contextValue = useMemo(
    () => ({
      sessionLoading,
      accessToken,
      loggedIn,
      loading,
      logout,
      login,
    }),
    [sessionLoading, accessToken, loggedIn, loading, logout, login],
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
