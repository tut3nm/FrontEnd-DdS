import { useState, useEffect } from 'react';
import { getAll } from '../services/api';
import { useAuth } from './AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className="watches-container">
      <div className="watches-header">
        <h2>Lista de Relojes</h2>
        {isAdmin && (
          <Link to="/watches/create" className="create-button">
            Crear nuevo reloj
          </Link>
        )}
      </div>
      
      <div className="watches-content">
        <aside className="watches-filter">
          <input
            type="text"
            placeholder="Filtrar por modelo"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </aside>
        <ul className="watches-list">
          {filteredWatches.map((w) => (
            <li
              key={w.id}
              className="watches-item"
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