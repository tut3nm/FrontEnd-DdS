import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { create, getAll } from '../services/api';
import '../styles/register.css';
import '../styles/login.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [userpass, setUserpass] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [permissions, setPermissions] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await create('users', {
        username,
        userpass,
        email,
        birthday,
        permissions,
      });
      navigate('/login');
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro de usuario</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          className='entrada'
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className='entrada'
          type="password"
          placeholder="Contraseña"
          value={userpass}
          onChange={(e) => setUserpass(e.target.value)}
          required
        />
        <input
          className='entrada'
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className='entrada'
          type="text"
          placeholder="Fecha de nacimiento"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <input
          className='checkbox'
          type="checkbox"
          checked={permissions}
          onChange={() => setPermissions(!permissions)}
        />{' '}
        <label className='cinta-1'>
          Permisos de administrador
        </label>
        <button className='button' type="submit">Registrarse</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className='parrafo'>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}
