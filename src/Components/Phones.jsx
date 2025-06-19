import { useState, useEffect } from 'react';
import { getAll } from '../services/api';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

  return (
    <div className="phones-container">
      <div className="phones-header">
        <h2>Lista de Celulares</h2>
        {isAdmin && (
          <Link to="/phones/create" className="create-button">
            Crear nuevo celular
          </Link>
        )}
      </div>
      
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