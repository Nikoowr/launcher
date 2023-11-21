import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import { Navbar } from './components/custom/navbar';
import './globals.css';
import { Home } from './pages/home';
import { SignIn } from './pages/sign-in';

export default function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}
