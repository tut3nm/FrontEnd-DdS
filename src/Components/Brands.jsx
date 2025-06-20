import { useState, useEffect } from 'react';
import { getAll } from '../services/api';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import '../styles/device.css'; 

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    getAll('brands').then((res) => setBrands(res.data));
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2 className='head2'>Marcas</h2>
        {isAdmin && (
          <Link 
          to="/brands/create" 
          className="create-button"
          style={{textDecoration: 'none'}}>
            Crear nueva marca
          </Link>
        )}
      </div>
      
      <ul className="list">
        {brands.map((b) => (
          <li key={b.id} className="item">
            {b.name}
          </li>
        ))}
      </ul>
    </div>
  );
}