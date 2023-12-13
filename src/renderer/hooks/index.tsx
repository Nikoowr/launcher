import { ReactNode } from 'react';

import { AppProvider } from './app';
import { AuthProvider } from './auth';
import { GameProvider } from './game';
import { LangProvider } from './lang';

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <LangProvider>
      <AppProvider>
        <AuthProvider>
          <GameProvider>{children}</GameProvider>
        </AuthProvider>
      </AppProvider>
    </LangProvider>
  );
};
