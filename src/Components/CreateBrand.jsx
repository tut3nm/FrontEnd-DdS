import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from '../services/api';

export default function CreateBrand() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    try {
      await create('brands', { name });
      navigate('/brands');
    } catch (err) {
      setError(err.message || 'Error al crear la marca');
    }
  };

  return (
    <div>
      <h2>Nueva Marca</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre de la marca:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
          />
        </div>

        {error && <div>{error}</div>}

        <div>
          <button type="button" onClick={() => navigate('/brands')}>
            Cancelar
          </button>
          <button type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}