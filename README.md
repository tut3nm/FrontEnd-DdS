# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


ejemplo servicio: 
"import React, { useEffect, useState } from 'react';
import { getAll } from '../services/api';

const Phone = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll('phones')
      .then(response => {
        setPhones(response.data); // response.data asumiendo que el backend responde con los datos aquí
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar celulares');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando celulares...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Celulares</h2>
      <ul>
        {phones.map(phone => (
          <li key={phone.id}>
            {phone.name} - {phone.brand}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Phone;
"
