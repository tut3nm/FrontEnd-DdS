import { useState, useEffect } from 'react';
import { getAll, create } from '../services/api';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Watches() {
  const [watches, setWatches] = useState([]);
  const [filter, setFilter] = useState('');
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAll('watches').then((res) => setWatches(res.data));
  }, []);

  const filteredWatches = watches.filter((w) =>
    w.model.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCreate = async () => {
    const nuevo = {
      model: 'Nuevo reloj',
      brand_id: 1,
      release_date: '2025-01-01',
      age: 0,
    };
    await create('watches', nuevo);
    const res = await getAll('watches');
    setWatches(res.data);
  };

  return (
    <div className="watches-container">
      <h2>Lista de Relojes</h2>
      {isAdmin && <button onClick={handleCreate}>Crear nuevo reloj</button>}
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
