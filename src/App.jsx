import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Phones from './Components/Phones';
import PhoneDetail from './Components/PhoneDetail';
import Watches from './Components/Watches';
import WatchDetail from './Components/WatchDetail';
import Brands from './Components/Brands';
import Compare from './Components/Compare';

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
