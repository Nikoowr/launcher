import { ReactNode } from 'react';

import { AppProvider } from './app';
import { AuthProvider } from './auth';
import { GameProvider } from './game';
import { LangProvider } from './lang';
import { StageProvider } from './stage';
import { UpdateProvider } from './update';
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
              <UpdateProvider>
                <GameProvider>{children}</GameProvider>
              </UpdateProvider>
            </AppProvider>
          </LangProvider>
        </StageProvider>
      </UserProvider>
    </AuthProvider>
  );
};
