import React, { useState, useEffect } from 'react';
import { getAll, getById } from '../services/api';

export default function Compare() {
  const [resource, setResource] = useState('phones');
  const [items, setItems] = useState([]);
  const [firstId, setFirstId] = useState('');
  const [secondId, setSecondId] = useState('');
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems([]);
    setFirstId('');
    setSecondId('');
    setComparison(null);

    getAll(resource)
      .then(res => setItems(res.data))
      .catch(err => console.error('Error fetching items:', err));
  }, [resource]);

  const handleCompare = () => {
    if (!firstId || !secondId) return;

    setLoading(true);
    Promise.all([
      getById(resource, firstId),
      getById(resource, secondId)
    ])
      .then(([res1, res2]) => {
        setComparison({
          first: res1.data,
          second: res2.data
        });
      })
      .catch(err => console.error('Error comparing:', err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="compare-container">

      <div className="compare-bar">
        <label>
          Recurso:
          <select
            className="select"
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
            className="select"
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
            className="select"
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

        <button
          className="button"
          onClick={handleCompare}
          disabled={!firstId || !secondId || loading}
        >
          {loading ? 'Comparando…' : 'Comparar'}
        </button>
      </div>

      {comparison && (
        <div className="compare-results">
          {['first', 'second'].map(key => {
            const device = comparison[key];
            return (
              <div key={key} className="device-card">
                <h3>{device.brand} {device.model}</h3>
                {device.imageUrl && (
                  <img
                    src={device.imageUrl}
                    alt={`${device.brand} ${device.model}`}
                    className="device-image"
                  />
                )}
                <ul>
                  <li>Pantalla: {device.specs.screen}</li>
                  <li>CPU: {device.specs.cpu}</li>
                  <li>Batería: {device.specs.battery}</li>
                  <li>Cámara: {device.specs.camera}</li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
