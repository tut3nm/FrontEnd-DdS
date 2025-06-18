import { useState, useEffect } from 'react';
import { getAll, create } from '../services/api';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Phones() {
  const [phones, setPhones] = useState([]);
  const [filter, setFilter] = useState('');
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAll('phones').then((res) => setPhones(res.data));
  }, []);

  const filteredPhones = phones.filter((p) =>
    p.model.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCreate = async () => {
    const nuevo = {
      model: 'Nuevo modelo',
      brand_id: 1,
      release_date: '2025-01-01',
      age: 0,
    };
    await create('phones', nuevo);
    // recargar lista
    const res = await getAll('phones');
    setPhones(res.data);
  };

  return (
    <div className="phones-container">
      <h2>Lista de Celulares</h2>
      {isAdmin && <button onClick={handleCreate}>Crear nuevo celular</button>}
      <div className="phones-content">
        <aside className="phones-filter">
          <input
            type="text"
            placeholder="Filtrar por modelo"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </aside>
        <ul className="phones-list">
          {filteredPhones.map((p) => (
            <li
              key={p.id}
              className="phones-item"
              onClick={() => navigate(`/phones/${p.id}`)}
            >
              {p.model}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
