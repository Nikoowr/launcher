import { ReactNode } from 'react';

import { AppProvider } from './app';
import { AuthProvider } from './auth';
import { GameProvider } from './game';

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AppProvider>
      <AuthProvider>
        <GameProvider>{children}</GameProvider>
      </AuthProvider>
    </AppProvider>
  );
};
