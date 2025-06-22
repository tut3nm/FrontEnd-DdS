import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from '../services/api';
import '../styles/create.css';

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
    <div className='form-container'>
      <h2 className='head1'>Nueva Marca</h2>
      
      <form onSubmit={handleSubmit}>
      <div className='form-sec2'>
        <div className='form-group'>
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

        </div>

          <div>
            <button type="button" onClick={() => navigate('/brands')}
            className='cancel-btn'>
            Cancelar
            </button>
            <button type="submit" className='submit-btn'>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}