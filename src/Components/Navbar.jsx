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
      <img src="src/assets/home.svg" alt="home" className='img1'/>  
      Home
      </NavLink>

      <NavLink 
      to="/phones" 
      className='active'
      style={{textDecoration: 'none'}}>
      <img src="src/assets/phone.svg" alt="phone" className='img2'/>
      Teléfonos
      </NavLink>

      <NavLink
      to="/watches"
      className='active'
      style={{textDecoration: 'none'}}>
      <img src="src/assets/watch.svg" alt="watch" className='img3'/>
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
      <img src="src/assets/compare.svg" alt="comparar" className='img4'/>
      Comparar
      </NavLink>

      {user ? (
        <>
          <button onClick={handleLogout} className="bot-log">
          <img src="src/assets/logout.svg" alt="logout" />
          Logout
          </button>
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

