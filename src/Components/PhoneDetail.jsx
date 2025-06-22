import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById , remove } from '../services/api';
import { useAuth } from './AuthProvider';
import '../styles/detail.css';

export default function PhoneDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await getById('phones', id);
        setPhone(response.data);
      } catch (err) {
        setError('Error al cargar el teléfono');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhone();
  }, [id]);

  const handleEdit = () => {
    navigate(`/phones/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar este teléfono y todas sus especificaciones?')) {
      try {
        await remove('phones', id);
        alert('Teléfono eliminado correctamente');
        navigate('/phones');
      } catch (err) {
        alert('Error al eliminar el teléfono');
        console.error('Error:', err);
      }
    }
  };

  if (loading) return <div className="loading">Cargando teléfono...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!phone) return <div className="error">Teléfono no encontrado</div>;

  return (
    <div className="detail-container">
      <div className="header-section">
        <h2>{phone.model}</h2>
      </div>
        {isAdmin && (
          <div className="action-buttons">
            <button onClick={handleEdit} className="edit-btn">
              Editar Teléfono
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Eliminar Teléfono
            </button>
          </div>
        )}
      
      
      <div className="basic-info">
        <h3>Información Básica</h3>
        <div className='info-group'>
          <p className='p-info'><strong>Código:</strong> {phone.code || 'N/A'}</p>
          <p className='p-info'><strong>Marca ID:</strong> {phone.brand_id}</p>
          <p className='p-info'><strong>Fecha de lanzamiento:</strong> {phone.release_date}</p>
          <p className='p-info'><strong>Edad (meses):</strong> {phone.age || 'N/A'}</p>
          <p className='p-info'><strong>Precio:</strong> ${phone.price?.toFixed(2) || 'N/A'}</p>
        </div>
      </div>

      {phone.specs ? (
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
      ) : (
        <div className="specs-section">
          <h3>Especificaciones Técnicas</h3>
          <p className="no-specs">No hay especificaciones técnicas registradas para este teléfono.</p>
        </div>
      )}
    </div>
  );
}