import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Phones from './pages/Phones';
import PhoneDetail from './pages/PhoneDetail';
import Watches from './pages/Watches';
import WatchDetail from './pages/WatchDetail';
import Brands from './pages/Brands';
import Compare from './pages/Compare';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/phones"
            element={
              <ProtectedRoute>
                <Phones />
              </ProtectedRoute>
            }
          />
          <Route
            path="/phones/:id"
            element={
              <ProtectedRoute>
                <PhoneDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watches"
            element={
              <ProtectedRoute>
                <Watches />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watches/:id"
            element={
              <ProtectedRoute>
                <WatchDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brands"
            element={
              <ProtectedRoute>
                <Brands />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compare"
            element={
              <ProtectedRoute>
                <Compare />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
