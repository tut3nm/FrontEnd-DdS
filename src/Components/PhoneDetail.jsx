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
      
      <div className="basic-info">
        <h3>Información Básica</h3>
        <p><strong>Código:</strong> {phone.code || 'N/A'}</p>
        <p><strong>Marca ID:</strong> {phone.brand_id}</p>
        <p><strong>Fecha de lanzamiento:</strong> {phone.release_date}</p>
        <p><strong>Edad (meses):</strong> {phone.age || 'N/A'}</p>
        <p><strong>Precio:</strong> ${phone.price?.toFixed(2) || 'N/A'}</p>
      </div>

      {phone.specs && (
        <div className="specs-section">
          <h3>Especificaciones Técnicas</h3>
          
          <div className="specs-grid">
            <div className="spec-group">
              <h4>Cámaras</h4>
              {phone.specs.cam_1 && <p><strong>Principal:</strong> {phone.specs.cam_1}</p>}
              {phone.specs.cam_2 && <p><strong>Secundaria:</strong> {phone.specs.cam_2}</p>}
              {phone.specs.cam_3 && <p><strong>Terciaria:</strong> {phone.specs.cam_3}</p>}
              {phone.specs.cam_4 && <p><strong>Cuaternaria:</strong> {phone.specs.cam_4}</p>}
              {phone.specs.cam_front && <p><strong>Frontal:</strong> {phone.specs.cam_front}</p>}
            </div>

            <div className="spec-group">
              <h4>Hardware</h4>
              {phone.specs.chipset && <p><strong>Chipset:</strong> {phone.specs.chipset}</p>}
              {phone.specs.ram && <p><strong>RAM:</strong> {phone.specs.ram} GB</p>}
              {phone.specs.storage && <p><strong>Almacenamiento:</strong> {phone.specs.storage} GB</p>}
              {phone.specs.has_5g && <p><strong>5G:</strong> Sí</p>}
            </div>

            <div className="spec-group">
              <h4>Pantalla</h4>
              {phone.specs.display_tec && <p><strong>Tecnología:</strong> {phone.specs.display_tec}</p>}
              {phone.specs.display_inch && <p><strong>Tamaño:</strong> {phone.specs.display_inch}"</p>}
              {phone.specs.display_ppp && <p><strong>PPP:</strong> {phone.specs.display_ppp}</p>}
              {phone.specs.display_freq && <p><strong>Frecuencia:</strong> {phone.specs.display_freq} Hz</p>}
            </div>

            <div className="spec-group">
              <h4>Batería</h4>
              {phone.specs.batery && <p><strong>Capacidad:</strong> {phone.specs.batery} mAh</p>}
              {phone.specs.charge && <p><strong>Carga rápida:</strong> {phone.specs.charge}W</p>}
            </div>

            <div className="spec-group">
              <h4>Dimensiones</h4>
              {phone.specs.dimensions && <p><strong>Tamaño:</strong> {phone.specs.dimensions}</p>}
              {phone.specs.weight && <p><strong>Peso:</strong> {phone.specs.weight}g</p>}
            </div>

            <div className="spec-group">
              <h4>Software</h4>
              {phone.specs.os && <p><strong>Sistema operativo:</strong> {phone.specs.os}</p>}
            </div>

            <div className="spec-group">
              <h4>Calificaciones</h4>
              {phone.specs.calification && <p><strong>General:</strong> {phone.specs.calification}/10</p>}
              {phone.specs.cal_pri_qua && <p><strong>Calidad-Precio:</strong> {phone.specs.cal_pri_qua}/10</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}