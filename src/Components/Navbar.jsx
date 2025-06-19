import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import '../styles/navbar.css';


export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink 
      to="/" 
      className='active'
      style={{textDecoration: 'none'}}>
      <img src="src/assets/home.svg" alt="home" />  
      Home
      </NavLink>

      <NavLink 
      to="/phones" 
      className='active'
      style={{textDecoration: 'none'}}>
      <img src="src/assets/smartphone.svg" alt="phone" />
      Teléfonos
      </NavLink>

      <NavLink
      to="/watches"
      className='active'
      style={{textDecoration: 'none'}}>
      <img src="src/assets/watch.svg" alt="watch" />
      Relojes
      </NavLink>

      <NavLink
      to="/brands"
      className='active'
      style={{textDecoration: 'none'}}>
      Marcas
      </NavLink>

      <NavLink
      to="/compare"
      className='active'
      style={{textDecoration: 'none'}}>
      <img src="src/assets/compare.svg" alt="watchcomparar" />
      Comparar
      </NavLink>

      {user ? (
        <>
          <span className="navbar-user">Hola, {user.username}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login" className='active-log' style={{textDecoration: 'none'}}>Login</NavLink>
          <NavLink to="/register" className='active-log' style={{textDecoration: 'none'}}>Register</NavLink>
        </>
      )}
    </nav>
  );
}

// cambiar los 'active' por:
// {({ isActive }) => isActive ? 'active' : ''}
