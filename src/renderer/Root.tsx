import { App } from './App';
import { AppVersion } from './components/custom/app-version';
import { Toaster } from './components/ui/toaster';
import './globals.css';
import { Providers } from './hooks';

export const Root = () => {
  return (
    <Providers>
      <>
        <Toaster />
        <App />
        <AppVersion />
      </>
    </Providers>
  );
};
