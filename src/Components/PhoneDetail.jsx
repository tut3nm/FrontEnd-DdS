import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../services/api';

export default function PhoneDetail() {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    getById('phones', id).then((res) => setPhone(res.data));
  }, [id]);

  if (!phone) return <p>Cargando teléfono...</p>;

  return (
    <div className="detail-container">
      <h2>{phone.model}</h2>
      <p>Código: {phone.code}</p>
      <p>Fecha de lanzamiento: {phone.release_date}</p>
      <p>Edad: {phone.age}</p>
    </div>
  );
}
