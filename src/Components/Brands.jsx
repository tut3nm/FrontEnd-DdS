import { useState, useEffect } from 'react';
import { getAll } from '../services/api';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    getAll('brands').then((res) => setBrands(res.data));
  }, []);

  return (
    <div className="brands-container">
      <div className="brands-header">
        <h2>Marcas</h2>
        {isAdmin && (
          <Link to="/brands/create" className="create-button">
            Crear nueva marca
          </Link>
        )}
      </div>
      
      <ul className="brands-list">
        {brands.map((b) => (
          <li key={b.id} className="brand-item">
            {b.name}
          </li>
        ))}
      </ul>
    </div>
  );
}