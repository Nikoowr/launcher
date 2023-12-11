import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import { Navbar } from './components/custom/navbar';
import { ProtectedRoute } from './components/custom/protected-route';
import { RoutesEnum } from './constants/routes.constants';
import { Home } from './pages/home';
import { Settings } from './pages/settings';
import { SignIn } from './pages/sign-in';

export const App = () => {
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
