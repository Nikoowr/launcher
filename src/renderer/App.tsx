import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import { Navbar } from './components/custom/navbar';
import { ProtectedRoute } from './components/custom/protected-route';
import { Spinner } from './components/custom/spinner';
import { RoutesEnum } from './constants/routes.constants';
import { useStage } from './hooks/stage';
import { Home } from './pages/home';
import { Settings } from './pages/settings';
import { SignIn } from './pages/sign-in';

export const App = () => {
  const { loading, gameVersion, stage } = useStage();

  if (loading) {
    return (
      <div className="flex h-[100vh] w-full flex-col items-center justify-center  gap-2">
        <div className="flex gap-4">
          <Spinner />
          <p>Loading environment...</p>
        </div>
        <div className="flex flex-col">
          <span>
            Game version: <strong>{gameVersion}</strong>
          </span>
          <span>
            Environment: <strong>{stage}</strong>
          </span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path={RoutesEnum.Home}
          element={
            <ProtectedRoute>
              <Navbar />
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path={RoutesEnum.Settings}
          element={
            <ProtectedRoute>
              <Navbar btnClassName="bg-transparent hover:bg-[#0001] text-black" />
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path={RoutesEnum.SignIn}
          element={
            <>
              <Navbar />
              <SignIn />
            </>
          }
        />
      </Routes>
    </Router>
  );
};
