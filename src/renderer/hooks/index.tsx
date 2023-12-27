import { ReactNode } from 'react';

import { AppProvider } from './app';
import { AuthProvider } from './auth';
import { GameProvider } from './game';
import { LangProvider } from './lang';
import { UserProvider } from './user';

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <LangProvider>
      <AppProvider>
        <AuthProvider>
          <UserProvider>
            <GameProvider>{children}</GameProvider>
          </UserProvider>
        </AuthProvider>
      </AppProvider>
    </LangProvider>
  );
};
