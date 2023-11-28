import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { RoutesEnum } from '../../constants/routes.constants';
import { useAuth } from '../../hooks/auth';
import { Icons } from './icons';

export type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { loggedIn, sessionLoading } = useAuth();

  if (sessionLoading) {
    return (
      <div className="flex h-[100vh] w-full items-center justify-center">
        <Icons.spinner />
      </div>
    );
  }

  if (!loggedIn) {
    return <Navigate to={RoutesEnum.SignIn} />;
  }

  return children;
};
