import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import { ProtectedRoute } from './components/custom/protected-route';
import { RoutesEnum } from './constants/routes.constants';
import { useApp } from './hooks/app';
import { Home } from './pages/home';
import { SignIn } from './pages/sign-in';

export const App = () => {
  const { updateFound } = useApp();

  console.log(updateFound);

  return (
    <Router>
      <Routes>
        <Route
          path={RoutesEnum.Home}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path={RoutesEnum.SignIn} element={<SignIn />} />
      </Routes>
    </Router>
  );
};
