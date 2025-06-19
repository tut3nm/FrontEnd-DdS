import React, { useState, useEffect } from 'react';
import { getAll, getById } from '../services/api';

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
      const res1 = await getById(resource, firstId);
      const res2 = await getById(resource, secondId);
      setFirstDevice(res1.data);
      setSecondDevice(res2.data);
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };

  return (
    <div className="compare-container">
      
      <div className="compare-bar">
        <label>
          Dispositivo:
          <select
            value={resource}
            onChange={e => setResource(e.target.value)}
          >
            <option value="phones">Celulares</option>
            <option value="watches">Smartwatches</option>
          </select>
        </label>

        <label>
          Primero:
          <select
            value={firstId}
            onChange={e => setFirstId(e.target.value)}
          >
            <option value="">Selecciona uno…</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>
                {item.brand} {item.model}
              </option>
            ))}
          </select>
        </label>

        <label>
          Segundo:
          <select
            value={secondId}
            onChange={e => setSecondId(e.target.value)}
          >
            <option value="">Selecciona uno…</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>
                {item.brand} {item.model}
              </option>
            ))}
          </select>
        </label>

        <button onClick={handleCompare} disabled={!firstId || !secondId}>
          Comparar
        </button>
      </div>

      <div className="compare-results">
        {firstDevice && (
          <div className="device-card">
            <h3>{firstDevice.brand} {firstDevice.model}</h3>
            {firstDevice.imageUrl && (
              <img
                src={firstDevice.imageUrl}
                alt={`${firstDevice.brand} ${firstDevice.model}`}
              />
            )}
            <ul>
              <li>Pantalla: {firstDevice.specs?.screen}</li>
              <li>CPU: {firstDevice.specs?.cpu}</li>
              <li>Batería: {firstDevice.specs?.battery}</li>
              <li>Cámara: {firstDevice.specs?.camera}</li>
            </ul>
          </div>
        )}

        {secondDevice && (
          <div className="device-card">
            <h3>{secondDevice.brand} {secondDevice.model}</h3>
            {secondDevice.imageUrl && (
              <img
                src={secondDevice.imageUrl}
                alt={`${secondDevice.brand} ${secondDevice.model}`}
              />
            )}
            <ul>
              <li>Pantalla: {secondDevice.specs?.screen}</li>
              <li>CPU: {secondDevice.specs?.cpu}</li>
              <li>Batería: {secondDevice.specs?.battery}</li>
              <li>Cámara: {secondDevice.specs?.camera}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
