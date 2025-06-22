import { useState, useEffect } from 'react';
import { getAll } from '../services/api';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/device.css'; 

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
    <div className="container">
      <div className="header">
        <h2 className='head2'>Lista de Teléfonos</h2>
        {isAdmin && (
          <Link to="/phones/create" 
            className="create-button" 
            style={{textDecoration: 'none'}}>
            Crear nuevo Teléfono
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
          {filteredPhones.map((p) => (
            <li
              key={p.id}
              className="item"
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