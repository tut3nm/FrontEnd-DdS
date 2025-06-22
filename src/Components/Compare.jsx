import React, { useState, useEffect } from 'react';
import { getAll, getById } from '../services/api';
import '../styles/compare.css';

export default function Compare() {
  const [resource, setResource] = useState('phones');
  const [items, setItems] = useState([]);
  const [firstDevice, setFirstDevice] = useState(null);
  const [secondDevice, setSecondDevice] = useState(null);
  const [firstId, setFirstId] = useState('');
  const [secondId, setSecondId] = useState('');

  useEffect(() => {
    setItems([]);
    setFirstId('');
    setSecondId('');
    setFirstDevice(null);
    setSecondDevice(null);

    getAll(resource)
      .then(res => setItems(res.data))
      .catch(err => console.error('Error fetching items:', err));
  }, [resource]);

  const handleCompare = async () => {
    if (!firstId || !secondId) return;

    try {
      const [res1, res2] = await Promise.all([
        getById(resource, firstId),
        getById(resource, secondId)
      ]);
      setFirstDevice(res1.data);
      setSecondDevice(res2.data);
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };

  const renderSpecs = (specs) => {
    if (!specs) return <p>Sin especificaciones disponibles.</p>;

    return (
      <ul>
        {Object.entries(specs).map(([key, value]) => (
          <li key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="compare-container">
      <div className="compare-bar">
        <label className='label-1'>
          Dispositivo:
          <select
            className='option'
            value={resource}
            onChange={e => setResource(e.target.value)}
          >
            <option value="phones" className='option'>Teléfonos</option>
            <option value="watches" className='option'>Relojes</option>
          </select>
        </label>
        <div className="compare-selects">
        <label className='label-select'>
          Primero:
          <select
            className='option'
            value={firstId}
            onChange={e => setFirstId(e.target.value)}
          >
            <option value="" className='option'>Selecciona uno…</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>
                {item.brand} {item.model}
              </option>
            ))}
          </select>
        </label>

        <label className='label-select'>
          Segundo:
          <select
            className='option'
            value={secondId}
            onChange={e => setSecondId(e.target.value)}
          >
            <option value="" className='option'>Selecciona uno…</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>
                {item.brand} {item.model}
              </option>
            ))}
          </select>
        </label>
        </div>
      </div>

        <button onClick={handleCompare} disabled={!firstId || !secondId}
          className="compare-btn">
          Comparar
        </button>
      

      <div className="compare-results">
        {firstDevice && (
          <div className="device-card">
            <h3>{firstDevice.brand} {firstDevice.model}</h3>
            {renderSpecs(firstDevice.specs)}
          </div>
        )}

        {secondDevice && (
          <div className="device-card">
            <h3>{secondDevice.brand} {secondDevice.model}</h3>
            {renderSpecs(secondDevice.specs)}
          </div>
        )}
      </div>
    </div>
  );
}

