import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById, remove } from '../services/api';
import { useAuth } from './AuthProvider';
import '../styles/detail.css';

export default function WatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatch = async () => {
      try {
        const response = await getById('watches', id);
        setWatch(response.data);
      } catch (err) {
        setError('Error al cargar el reloj');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWatch();
  }, [id]);

  const handleEdit = () => {
    navigate(`/watches/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar este reloj y todas sus especificaciones?')) {
      try {
        await remove('watches', id);
        alert('Reloj eliminado correctamente');
        navigate('/watches');
      } catch (err) {
        alert('Error al eliminar el reloj');
        console.error('Error:', err);
      }
    }
  };

  if (loading) return <div className="loading">Cargando reloj...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!watch) return <div className="error">Reloj no encontrado</div>;

  return (
    <div className="detail-container">
      <div className="header-section">
        <h2>{watch.model}</h2>
      </div>
        {isAdmin && (
          <div className="action-buttons">
            <button onClick={handleEdit} className="edit-btn">
              Editar Reloj
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Eliminar Reloj
            </button>
          </div>
        )}

      
      <div className="basic-info">
        <h3>Información Básica</h3>
        <p><strong>Código:</strong> {watch.code || 'N/A'}</p>
        <p><strong>Marca ID:</strong> {watch.brand_id}</p>
        <p><strong>Fecha de lanzamiento:</strong> {watch.release_date || 'N/A'}</p>
        <p><strong>Edad (meses):</strong> {watch.age || 'N/A'}</p>
        <p><strong>Precio:</strong> ${watch.price?.toFixed(2) || 'N/A'}</p>
      </div>

      {watch.specs ? (
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
              {watch.specs.weight && <p><strong>Peso:</strong> {watch.specs.weight}g</p>}
            </div>

            <div className="spec-group">
              <h4>Calificaciones</h4>
              {watch.specs.calification && <p><strong>General:</strong> {watch.specs.calification}/10</p>}
              {watch.specs.cal_pri_qua && <p><strong>Calidad-Precio:</strong> {watch.specs.cal_pri_qua}/10</p>}
            </div>
          </div>
        </div>
      ) : (
        <div className="specs-section">
          <h3>Especificaciones Técnicas</h3>
          <p className="no-specs">No hay especificaciones técnicas registradas para este reloj.</p>
        </div>
      )}
    </div>
  );
}