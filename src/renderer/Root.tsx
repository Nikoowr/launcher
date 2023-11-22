import { App } from './App';
import { Navbar } from './components/custom/navbar';
import { Toaster } from './components/ui/toaster';
import './globals.css';
import { AuthProvider } from './hooks';

export const Root = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Toaster />

      <Navbar />
      <App />
    </AuthProvider>
  );
};
