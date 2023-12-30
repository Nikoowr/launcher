import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { User } from '../interfaces';
import { api } from '../services/api/functions';
import { useAuth } from './auth';

type UserProviderProps = {
  children: ReactNode;
};

type UserContextData = {
  user: User;
};

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>({} as User);

  const { loggedIn, logout } = useAuth();

  const getUser = async () => {
    try {
      const data = await api.getUserMe();
      setUser(data?.user);
    } catch {}
  };

  useEffect(() => {
    if (loggedIn) {
      getUser();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (!user && loggedIn) {
      logout();
    }
  });

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextData => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
};
