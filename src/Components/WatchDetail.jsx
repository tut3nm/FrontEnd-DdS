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

      <div className="basic-info">
        <h3>Información Básica</h3>
        <p><strong>Código:</strong> {watch.code || 'N/A'}</p>
        <p><strong>Marca ID:</strong> {watch.brand_id}</p>
        <p><strong>Fecha de lanzamiento:</strong> {watch.release_date || 'N/A'}</p>
        <p><strong>Edad (meses):</strong> {watch.age || 'N/A'}</p>
        <p><strong>Precio:</strong> ${watch.price?.toFixed(2) || 'N/A'}</p>
      </div>

      {watch.specs && (
        <div className="specs-section">
          <h3>Especificaciones Técnicas</h3>

          <div className="specs-grid">
            <div className="spec-group">
              <h4>Pantalla</h4>
              {watch.specs.display_tec && <p><strong>Tecnología:</strong> {watch.specs.display_tec}</p>}
              {watch.specs.display_inch && <p><strong>Tamaño:</strong> {watch.specs.display_inch}"</p>}
              {watch.specs.display_ppp && <p><strong>PPP:</strong> {watch.specs.display_ppp}</p>}
            </div>

            <div className="spec-group">
              <h4>Hardware</h4>
              {watch.specs.chipset && <p><strong>Chipset:</strong> {watch.specs.chipset}</p>}
              {watch.specs.ram && <p><strong>RAM:</strong> {watch.specs.ram} MB</p>}
              {watch.specs.storage && <p><strong>Almacenamiento:</strong> {watch.specs.storage} MB</p>}
              {watch.specs.has_sim && <p><strong>SIM:</strong> Sí</p>}
            </div>

            <div className="spec-group">
              <h4>Batería</h4>
              {watch.specs.batery && <p><strong>Capacidad:</strong> {watch.specs.batery} mAh</p>}
            </div>

            <div className="spec-group">
              <h4>Software</h4>
              {watch.specs.os && <p><strong>Sistema operativo:</strong> {watch.specs.os}</p>}
            </div>

            <div className="spec-group">
              <h4>Dimensiones</h4>
              {watch.specs.dimensions && <p><strong>Tamaño:</strong> {watch.specs.dimensions}</p>}
              {watch.specs.weight && <p><strong>Peso:</strong> {watch.specs.weight} g</p>}
            </div>

            <div className="spec-group">
              <h4>Calificaciones</h4>
              {watch.specs.calification && <p><strong>General:</strong> {watch.specs.calification}/10</p>}
              {watch.specs.cal_pri_qua && <p><strong>Calidad-Precio:</strong> {watch.specs.cal_pri_qua}/10</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
