import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
      <NavLink to="/phones" className={({ isActive }) => isActive ? 'active' : ''}>Phones</NavLink>
      <NavLink to="/watches" className={({ isActive }) => isActive ? 'active' : ''}>Watches</NavLink>
      <NavLink to="/brands" className={({ isActive }) => isActive ? 'active' : ''}>Brands</NavLink>
      <NavLink to="/compare" className={({ isActive }) => isActive ? 'active' : ''}>Compare</NavLink>
      {user ? (
        <>
          <span className="navbar-user">Hola, {user.username}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
          <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Register</NavLink>
        </>
      )}
    </nav>
  );
}
