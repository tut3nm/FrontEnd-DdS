import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById, update } from '../services/api';
import { useAuth } from './AuthProvider';

export default function EditWatch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [watchData, setWatchData] = useState({
    model: '',
    code: '',
    brand_id: '',
    release_date: '',
    age: '',
    price: ''
  });

  const [specsData, setSpecsData] = useState({
    chipset: '',
    display_tec: '',
    display_ppp: '',
    display_inch: '',
    batery: '',
    os: '',
    ram: '',
    storage: '',
    dimensions: '',
    weight: '',
    has_sim: false,
    calification: '',
    cal_pri_qua: ''
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate(`/watches/${id}`);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await getById('watches', id);
        setWatchData({
          model: response.data.model,
          code: response.data.code,
          brand_id: response.data.brand_id,
          release_date: response.data.release_date,
          age: response.data.age,
          price: response.data.price
        });

        if (response.data.specs) {
          setSpecsData(response.data.specs);
        }
      } catch (err) {
        setError('Error al cargar los datos del reloj');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isAdmin, navigate]);

  const handleWatchChange = (e) => {
    const { name, value } = e.target;
    setWatchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSpecsData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update('watches', id, watchData);
      await update('watchSpecs', id, specsData);
      
      alert('Reloj y especificaciones actualizados correctamente');
      navigate(`/watches/${id}`);
    } catch (err) {
      alert('Error al actualizar el reloj');
      console.error('Error:', err);
    }
  };

  if (loading) return <div className="loading">Cargando datos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-container">
      <h2>Editar Reloj</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Información Básica</h3>
          
          <div className="form-group">
            <label>Modelo*</label>
            <input
              type="text"
              name="model"
              value={watchData.model}
              onChange={handleWatchChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Código</label>
            <input
              type="text"
              name="code"
              value={watchData.code}
              onChange={handleWatchChange}
            />
          </div>
          
          <div className="form-group">
            <label>Marca ID*</label>
            <input
              type="text"
              name="brand_id"
              value={watchData.brand_id}
              onChange={handleWatchChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Fecha de lanzamiento</label>
            <input
              type="date"
              name="release_date"
              value={watchData.release_date}
              onChange={handleWatchChange}
            />
          </div>
          
          <div className="form-group">
            <label>Edad (meses)</label>
            <input
              type="number"
              name="age"
              value={watchData.age}
              onChange={handleWatchChange}
            />
          </div>
          
          <div className="form-group">
            <label>Precio*</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={watchData.price}
              onChange={handleWatchChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Especificaciones Técnicas</h3>
          
          <div className="specs-grid">
            <div className="spec-group">
              <h4>Pantalla</h4>
              <div className="form-group">
                <label>Tecnología</label>
                <input
                  type="text"
                  name="display_tec"
                  value={specsData.display_tec}
                  onChange={handleSpecsChange}
                  placeholder="Ej: AMOLED"
                />
              </div>
              <div className="form-group">
                <label>PPP</label>
                <input
                  type="number"
                  name="display_ppp"
                  value={specsData.display_ppp}
                  onChange={handleSpecsChange}
                />
              </div>
              <div className="form-group">
                <label>Pulgadas</label>
                <input
                  type="number"
                  step="0.1"
                  name="display_inch"
                  value={specsData.display_inch}
                  onChange={handleSpecsChange}
                />
              </div>
            </div>

            <div className="spec-group">
              <h4>Hardware</h4>
              <div className="form-group">
                <label>Chipset</label>
                <input
                  type="text"
                  name="chipset"
                  value={specsData.chipset}
                  onChange={handleSpecsChange}
                  placeholder="Ej: Exynos W920"
                />
              </div>
              <div className="form-group">
                <label>RAM (MB)</label>
                <input
                  type="number"
                  name="ram"
                  value={specsData.ram}
                  onChange={handleSpecsChange}
                />
              </div>
              <div className="form-group">
                <label>Almacenamiento (MB)</label>
                <input
                  type="number"
                  name="storage"
                  value={specsData.storage}
                  onChange={handleSpecsChange}
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="has_sim"
                    checked={specsData.has_sim}
                    onChange={handleSpecsChange}
                  />
                  Soporta SIM
                </label>
              </div>
            </div>

            <div className="spec-group">
              <h4>Batería</h4>
              <div className="form-group">
                <label>Capacidad (mAh)</label>
                <input
                  type="number"
                  name="batery"
                  value={specsData.batery}
                  onChange={handleSpecsChange}
                />
              </div>
            </div>

            <div className="spec-group">
              <h4>Software</h4>
              <div className="form-group">
                <label>Sistema Operativo</label>
                <input
                  type="text"
                  name="os"
                  value={specsData.os}
                  onChange={handleSpecsChange}
                  placeholder="Ej: Wear OS"
                />
              </div>
            </div>

            <div className="spec-group">
              <h4>Dimensiones</h4>
              <div className="form-group">
                <label>Tamaño</label>
                <input
                  type="text"
                  name="dimensions"
                  value={specsData.dimensions}
                  onChange={handleSpecsChange}
                  placeholder="Ej: 40.4 x 39.3 x 9.8 mm"
                />
              </div>
              <div className="form-group">
                <label>Peso (g)</label>
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={specsData.weight}
                  onChange={handleSpecsChange}
                />
              </div>
            </div>

            <div className="spec-group">
              <h4>Calificaciones</h4>
              <div className="form-group">
                <label>General (0-10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  name="calification"
                  value={specsData.calification}
                  onChange={handleSpecsChange}
                />
              </div>
              <div className="form-group">
                <label>Calidad-Precio (0-10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  name="cal_pri_qua"
                  value={specsData.cal_pri_qua}
                  onChange={handleSpecsChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Guardar Cambios
          </button>
          <button 
            type="button" 
            onClick={() => navigate(`/watches/${id}`)}
            className="cancel-btn"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}