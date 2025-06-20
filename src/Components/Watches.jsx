import { useState, useEffect } from 'react';
import { getAll } from '../services/api';
import { useAuth } from './AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/device.css'; 

export default function Watches() {
  const [watches, setWatches] = useState([]);
  const [filter, setFilter] = useState('');
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadWatches = async () => {
      try {
        const response = await getAll('watches');
        setWatches(response.data);
      } catch (error) {
        console.error('Error loading watches:', error);
      }
    };
    loadWatches();
  }, []);

  const filteredWatches = watches.filter((w) =>
    w.model.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h2 className='head2'>Lista de Relojes</h2>
        {isAdmin && (
          <Link 
          to="/watches/create" 
          className="create-button"
          style={{textDecoration: 'none'}}>
            Crear nuevo reloj
          </Link>
        )}
      </div>
      
      <div className="content">
        <aside className="filter">
          <input
            type="text"
            placeholder="Filtrar por modelo"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </aside>
        <ul className="list">
          {filteredWatches.map((w) => (
            <li
              key={w.id}
              className="item"
              onClick={() => navigate(`/watches/${w.id}`)}
            >
              {w.model}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}