import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import { ProtectedRoute } from './components/custom/protected-route';
import { RoutesEnum } from './constants/routes.constants';
import { Home } from './pages/home';
import { SignIn } from './pages/sign-in';

export const App = () => {
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
