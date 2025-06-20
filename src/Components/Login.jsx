import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { getAll } from '../services/api';
import '../styles/login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [userpass, setUserpass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await getAll('users');
    console.log('Datos ingresados:', { username, userpass });
    console.log('Usuarios del backend:', res.data);
    const foundUser = res.data.find(
      (u) => u.username === username && u.userpass === userpass
    );

    if (foundUser) {
      login(foundUser);
      navigate('/');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  } catch (err) {
    console.error(err);
    setError('Error al conectarse al servidor');
  }
};

  return (
    <div className="auth-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={userpass}
          onChange={(e) => setUserpass(e.target.value)}
          required
        />
        <button className='button' type="submit">Ingresar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        ¿No tenes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}
