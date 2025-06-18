import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../services/api';

export default function WatchDetail() {
  const { id } = useParams();
  const [watch, setWatch] = useState(null);

  useEffect(() => {
    getById('watches', id).then((res) => setWatch(res.data));
  }, [id]);

  if (!watch) return <p>Cargando reloj...</p>;

  return (
    <div className="detail-container">
      <h2>{watch.model}</h2>
      <p>Código: {watch.code}</p>
      <p>Fecha de lanzamiento: {watch.release_date}</p>
      <p>Edad: {watch.age}</p>
    </div>
  );
}
