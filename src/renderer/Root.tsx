import { App } from './App';
import { AppVersion } from './components/custom/app-version';
import { Navbar } from './components/custom/navbar';
import { Toaster } from './components/ui/toaster';
import './globals.css';
import { Providers } from './hooks';

export const Root = () => {
  return (
    <Providers>
      <>
        <Navbar />
        <Toaster />
        <App />
        <AppVersion />
      </>
    </Providers>
  );
};
