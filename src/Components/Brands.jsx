import { useState, useEffect } from 'react';
import { getAll } from '../services/api';

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getAll('brands').then((res) => setBrands(res.data));
  }, []);

  return (
    <div className="brands-container">
      <h2>Marcas</h2>
      <ul>
        {brands.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}
