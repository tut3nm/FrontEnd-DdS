import { useAuth } from './AuthProvider';
import { useEffect, useState } from 'react';
import { getAll } from '../services/api';
import '../styles/home.css'; 

export default function Home() {
  const { user } = useAuth();
  const [favPhones, setFavPhones] = useState([]);
  const [favWatches, setFavWatches] = useState([]);

  useEffect(() => {
    getAll('phones').then((res) => setFavPhones(res.data.slice(0, 3)));
    getAll('watches').then((res) => setFavWatches(res.data.slice(0, 3)));
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenido, {user.username}!</h1>

      <section className='section1'>
        <h2>Teléfonos favoritos</h2>
        <div className="fav-list">
          {favPhones.map((p) => (
            <div key={p.id} className="fav-item">
              <p>{p.model}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='section2'>
        <h2>Relojes favoritos</h2>
        <div className="fav-list">
          {favWatches.map((w) => (
            <div key={w.id} className="fav-item">
              <p>{w.model}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>© Todos los derechos reservados al Diegote</footer>
    </div>
  );
}
