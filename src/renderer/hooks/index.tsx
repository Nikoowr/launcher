import { ReactNode } from 'react';

import { AppProvider } from './app';
import { AuthProvider } from './auth';
import { GameProvider } from './game';
import { LangProvider } from './lang';
import { StageProvider } from './stage';
import { UserProvider } from './user';

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <UserProvider>
        <StageProvider>
          <LangProvider>
            <AppProvider>
              <GameProvider>{children}</GameProvider>
            </AppProvider>
          </LangProvider>
        </StageProvider>
      </UserProvider>
    </AuthProvider>
  );
};
