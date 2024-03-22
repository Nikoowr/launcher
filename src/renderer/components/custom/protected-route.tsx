import { LogOut } from 'lucide-react';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { RoutesEnum } from '../../constants/routes.constants';
import { useAuth } from '../../hooks/auth';
import { Button } from '../ui/button';
import { Spinner } from './spinner';

export type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { loggedIn, sessionLoading, logout } = useAuth();

  if (sessionLoading) {
    return (
      <div className="flex h-[100vh] w-full flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-4">
          <Spinner />
          <p>Loading data...</p>
        </div>

        <Button onClick={logout}>
          <LogOut className="mr-2 size-4" />
          <span>Logout</span>
        </Button>
      </div>
    );
  }

  if (!loggedIn) {
    return <Navigate to={RoutesEnum.SignIn} />;
  }

  return children;
};
