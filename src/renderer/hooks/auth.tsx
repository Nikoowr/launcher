import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { api } from '../services/api/functions';
import { securityUtils } from '../services/api/utils';

type AuthProviderProps = {
  children: ReactNode;
};

type Credentials = {
  password: string;
  email: string;
};

type AuthContextData = {
  login: (credentials: Credentials) => void;
  sessionLoading: boolean;
  logout: () => void;
  loggedIn: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sessionLoading, setSessionLoading] = useState(true);

  const handleSession = useCallback(async () => {
    setSessionLoading(true);

    const session = await securityUtils.getUserSession();

    setSessionLoading(false);
    setLoggedIn(!!session);
  }, []);

  const login = useCallback(
    async (credentials: Credentials) => {
      setLoading(true);
      const session = await api.createSession(credentials);

      await securityUtils.saveUserAuth({ session, credentials });

      await handleSession();

      setLoading(false);
    },
    [handleSession],
  );

  const logout = useCallback(async () => {
    await securityUtils.deleteUserAuth();
    setLoggedIn(false);
  }, []);

  useEffect(() => {
    handleSession();
  }, [handleSession]);

  const contextValue = useMemo(
    () => ({
      sessionLoading,
      loggedIn,
      loading,
      logout,
      login,
    }),
    [sessionLoading, loggedIn, loading, logout, login],
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
