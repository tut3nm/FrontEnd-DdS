import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById, update } from '../services/api';
import { useAuth } from './AuthProvider';

export default function EditPhone() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [phoneData, setPhoneData] = useState({
    model: '',
    code: '',
    brand_id: '',
    release_date: '',
    age: '',
    price: ''
  });

  const [specsData, setSpecsData] = useState({
    cam_1: '',
    cam_2: '',
    cam_3: '',
    cam_4: '',
    cam_front: '',
    chipset: '',
    display_tec: '',
    display_ppp: '',
    display_inch: '',
    display_freq: '',
    batery: '',
    charge: '',
    os: '',
    ram: '',
    storage: '',
    dimensions: '',
    weight: '',
    video_specs: '',
    has_5g: false,
    calification: '',
    cal_pri_qua: ''
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate(`/phones/${id}`);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await getById('phones', id);
        setPhoneData({
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
        setError('Error al cargar los datos del teléfono');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isAdmin, navigate]);

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setPhoneData(prev => ({ ...prev, [name]: value }));
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
      await update('phones', id, phoneData);

      await update('phoneSpecs', id, specsData);
      
      alert('Teléfono y especificaciones actualizados correctamente');
      navigate(`/phones/${id}`);
    } catch (err) {
      alert('Error al actualizar el teléfono');
      console.error('Error:', err);
    }
  };

  if (loading) return <div className="loading">Cargando datos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="form-container">
      <h2 className='head1'>Editar Teléfono</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-sec">
          <h3 className='head3'>Información Básica</h3>
          <div className='specs-grid'>
          <div className="form-group">
            <label>Modelo*</label>
            <input
              type="text"
              name="model"
              value={phoneData.model}
              onChange={handlePhoneChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Código</label>
            <input
              type="text"
              name="code"
              value={phoneData.code}
              onChange={handlePhoneChange}
            />
          </div>
          
          <div className="form-group">
            <label>Marca ID*</label>
            <input
              type="text"
              name="brand_id"
              value={phoneData.brand_id}
              onChange={handlePhoneChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Fecha de lanzamiento</label>
            <input
              type="date"
              name="release_date"
              value={phoneData.release_date}
              onChange={handlePhoneChange}
            />
          </div>
          
          <div className="form-group">
            <label>Edad (meses)</label>
            <input
              type="number"
              name="age"
              value={phoneData.age}
              onChange={handlePhoneChange}
            />
          </div>
          
          <div className="form-group">
            <label>Precio*</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={phoneData.price}
              onChange={handlePhoneChange}
              required
            />
          </div>
          </div>
        </div>

        <div className="form-sec">
          <h3 className='head3'>Especificaciones Técnicas</h3>
          
          <div className="specs-grid">
              <div className="form-group">
                <label>Cámara Principal</label>
                <input
                  type="text"
                  name="cam_1"
                  value={specsData.cam_1}
                  onChange={handleSpecsChange}
                  placeholder="Ej: 50MP f/1.8"
                />
              </div>
              <div className="form-group">
                <label>Cámara Secundaria</label>
                <input
                  type="text"
                  name="cam_2"
                  value={specsData.cam_2}
                  onChange={handleSpecsChange}
                  placeholder="Ej: 12MP ultra wide"
                />
              </div>
              <div className="form-group">
                <label>Cámara Terciaria</label>
                <input
                  type="text"
                  name="cam_3"
                  value={specsData.cam_3}
                  onChange={handleSpecsChange}
                />
              </div>
              <div className="form-group">
                <label>Cámara Cuaternaria</label>
                <input
                  type="text"
                  name="cam_4"
                  value={specsData.cam_4}
                  onChange={handleSpecsChange}
                />
              </div>
              <div className="form-group">
                <label>Cámara Frontal</label>
                <input
                  type="text"
                  name="cam_front"
                  value={specsData.cam_front}
                  onChange={handleSpecsChange}
                  placeholder="Ej: 12MP f/2.2"
                />
            </div>

              <div className="form-group">
                <label>Chipset</label>
                <input
                  type="text"
                  name="chipset"
                  value={specsData.chipset}
                  onChange={handleSpecsChange}
                  placeholder="Ej: Snapdragon 8 Gen 2"
                />
              </div>
              <div className="form-group">
                <label>RAM (GB)</label>
                <input
                  type="number"
                  name="ram"
                  value={specsData.ram}
                  onChange={handleSpecsChange}
                />
              </div>
              <div className="form-group">
                <label>Almacenamiento (GB)</label>
                <input
                  type="number"
                  name="storage"
                  value={specsData.storage}
                  onChange={handleSpecsChange}
                />
              </div>
              <div className="form-group checkbox-group">
                <label>Soporta 5G</label>
                  <input
                    type="checkbox"
                    name="has_5g"
                    checked={specsData.has_5g}
                    onChange={handleSpecsChange}
                  />
            </div>

              <div className="form-group">
                <label>Tecnología de la Pantalla</label>
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
              <div className="form-group">
                <label>Frecuencia (Hz)</label>
                <input
                  type="number"
                  name="display_freq"
                  value={specsData.display_freq}
                  onChange={handleSpecsChange}
                />
              </div>

              <div className="form-group">
                <label>Capacidad (mAh)</label>
                <input
                  type="number"
                  name="batery"
                  value={specsData.batery}
                  onChange={handleSpecsChange}
                />
              </div>
              <div className="form-group">
                <label>Carga rápida (W)</label>
                <input
                  type="number"
                  name="charge"
                  value={specsData.charge}
                  onChange={handleSpecsChange}
                />
              </div>

              <div className="form-group">
                <label>Tamaño</label>
                <input
                  type="text"
                  name="dimensions"
                  value={specsData.dimensions}
                  onChange={handleSpecsChange}
                  placeholder="Ej: 146.7 x 71.5 x 7.9 mm"
                />
              </div>
              <div className="form-group">
                <label>Peso (g)</label>
                <input
                  type="number"
                  name="weight"
                  value={specsData.weight}
                  onChange={handleSpecsChange}
                />
              </div>

              <div className="form-group">
                <label>Sistema Operativo</label>
                <input
                  type="text"
                  name="os"
                  value={specsData.os}
                  onChange={handleSpecsChange}
                  placeholder="Ej: Android 13"
                />
              </div>

              <div className="form-group">
                <label>Cal. General (0-10)</label>
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

              <div className="form-group">
                <label>Especificaciones de video</label>
                <textarea
                  name="video_specs"
                  value={specsData.video_specs}
                  onChange={handleSpecsChange}
                  placeholder="Ej: 8K@24fps, 4K@60fps"
                  rows="3"
                />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Guardar Cambios
          </button>
          <button 
            type="button" 
            onClick={() => navigate(`/phones/${id}`)}
            className="cancel-btn"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}