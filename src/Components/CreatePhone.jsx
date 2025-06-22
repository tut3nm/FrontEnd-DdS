import { useState, useEffect } from 'react';
import { create, getAll } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/create.css';

export default function CreatePhone() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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
    const fetchBrands = async () => {
      try {
        const response = await getAll('brands');
        setBrands(response.data);
      } catch (error) {
        console.error('Error al cargar marcas:', error);
        alert('Error al cargar las marcas disponibles');
      }
    };
    fetchBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in specsData) {
      setSpecsData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    } else {
      setPhoneData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!phoneData.model.trim()) newErrors.model = 'Modelo es requerido';
    if (!phoneData.brand_id) newErrors.brand_id = 'Marca es requerida';
    if (!phoneData.price || isNaN(parseFloat(phoneData.price))) {
      newErrors.price = 'Precio válido es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await create('phones', {
        model: phoneData.model,
        code: phoneData.code,
        brand_id: phoneData.brand_id,
        release_date: phoneData.release_date,
        age: phoneData.age ? parseInt(phoneData.age) : null,
        price: parseFloat(phoneData.price) || 0
      });

      console.log('Respuesta completa:', JSON.stringify(response, null, 2));

      if (!response?.data?.id) {
        console.error('Estructura de respuesta inesperada:', response);
        throw new Error('El servidor no devolvió un ID válido en la respuesta');
      }

      const phoneId = response.data.id;
      console.log('ID del teléfono obtenido:', phoneId);

      const hasSpecsData = Object.values(specsData).some(
        value => (typeof value === 'boolean' && value) || 
                (typeof value !== 'boolean' && value !== '')
      );

      if (hasSpecsData) {
        console.log('Creando especificaciones para phoneId:', phoneId);
        try {
          const specsResponse = await create(`phoneSpecs/${phoneId}`, {
            ...specsData,
            phone_id: phoneId
          });
          console.log('Especificaciones creadas:', specsResponse.data);
        } catch (specsError) {
          console.error('Error al crear especificaciones:', specsError.response?.data || specsError.message);
          alert('Teléfono creado, pero hubo un error al guardar las especificaciones');
        }
      }

      alert('¡Teléfono creado exitosamente!');
      navigate('/phones');
    } catch (error) {
      console.error('Error en el proceso de creación:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      
      alert(`Error: ${error.response?.data?.message || error.message || 'Error desconocido'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="phone-form">
        <h2 className='head1'>Crear Nuevo Teléfono</h2>

        <div className="form-sec">

          <h3 className='head3'>Información Básica</h3>
          
          <div className="specs-grid">
            <div className="form-group">
              <label>Modelo*</label>
              <input 
                name="model" 
                value={phoneData.model} 
                onChange={handleChange} 
                className={errors.model ? 'error' : ''}
                required
              />
              {errors.model && <span className="error-message">{errors.model}</span>}
            </div>
          
            <div className="form-group">
              <label>Código</label>
              <input 
                name="code" 
                value={phoneData.code} 
                onChange={handleChange} 
              />
            </div>
          
          <div className="form-group">
            <label>Marca*</label>
            <select
              name="brand_id"
              value={phoneData.brand_id}
              onChange={handleChange}
              className={errors.brand_id ? 'error' : ''}
              required
            >
              <option value="">Seleccione una marca</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand_id && <span className="error-message">{errors.brand_id}</span>}
          </div>
          
          <div className="form-group">
            <label>Fecha de Lanzamiento</label>
            <input 
              name="release_date" 
              type="date" 
              value={phoneData.release_date} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Edad (meses)</label>
            <input 
              name="age" 
              type="number" 
              min="0"
              value={phoneData.age} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Precio (USD)*</label>
            <input 
              name="price" 
              type="number" 
              step="0.01" 
              min="0"
              value={phoneData.price} 
              onChange={handleChange} 
              className={errors.price ? 'error' : ''}
              required
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>
          </div>
        </div>

        <div className="form-sec">
          <h3 className='head3'>Especificaciones Técnicas</h3>
          
          <div className="specs-grid">
            <div className="form-group">
              <label>Cámara Principal</label>
              <input 
                name="cam_1" 
                value={specsData.cam_1} 
                onChange={handleChange} 
                placeholder="Ej: 50MP f/1.8"
              />
            </div>
            
            <div className="form-group">
              <label>Cámara 2</label>
              <input 
                name="cam_2" 
                value={specsData.cam_2} 
                onChange={handleChange} 
                placeholder="Ej: 12MP ultra wide"
              />
            </div>
            
            <div className="form-group">
              <label>Cámara 3</label>
              <input 
                name="cam_3" 
                value={specsData.cam_3} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Cámara 4</label>
              <input 
                name="cam_4" 
                value={specsData.cam_4} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Cámara Frontal</label>
              <input 
                name="cam_front" 
                value={specsData.cam_front} 
                onChange={handleChange} 
                placeholder="Ej: 12MP f/2.2"
              />
            </div>

            <div className="form-group">
              <label>Chipset</label>
              <input 
                name="chipset" 
                value={specsData.chipset} 
                onChange={handleChange} 
                placeholder="Ej: Snapdragon 8 Gen 2"
              />
            </div>
            
            <div className="form-group">
              <label>RAM (GB)</label>
              <input 
                name="ram" 
                type="number" 
                min="0"
                value={specsData.ram} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Almacenamiento (GB)</label>
              <input 
                name="storage" 
                type="number" 
                min="0"
                value={specsData.storage} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Tecnología de Pantalla</label>
              <input 
                name="display_tec" 
                value={specsData.display_tec} 
                onChange={handleChange} 
                placeholder="Ej: AMOLED"
              />
            </div>
            
            <div className="form-group">
              <label>PPP de Pantalla</label>
              <input 
                name="display_ppp" 
                type="number" 
                min="0"
                value={specsData.display_ppp} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Pulgadas de Pantalla</label>
              <input 
                name="display_inch" 
                type="number" 
                step="0.1" 
                min="0"
                value={specsData.display_inch} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Frecuencia (Hz)</label>
              <input 
                name="display_freq" 
                type="number" 
                min="0"
                value={specsData.display_freq} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Batería (mAh)</label>
              <input 
                name="batery" 
                type="number" 
                min="0"
                value={specsData.batery} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Carga (W)</label>
              <input 
                name="charge" 
                type="number" 
                min="0"
                value={specsData.charge} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Sistema Operativo</label>
              <input 
                name="os" 
                value={specsData.os} 
                onChange={handleChange} 
                placeholder="Ej: Android 13"
              />
            </div>
            
            <div className="form-group">
              <label>Dimensiones</label>
              <input 
                name="dimensions" 
                value={specsData.dimensions} 
                onChange={handleChange} 
                placeholder="Ej: 146.7 x 71.5 x 7.9 mm"
              />
            </div>
            
            <div className="form-group">
              <label>Peso (g)</label>
              <input 
                name="weight" 
                type="number" 
                min="0"
                value={specsData.weight} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group full-width">
              <label>Especificaciones de Video</label>
              <textarea 
                name="video_specs" 
                value={specsData.video_specs} 
                onChange={handleChange} 
                placeholder="Ej: 8K@24fps, 4K@60fps"
                rows="3"
              />
            </div>
            
            <div className="form-checkbox-group">
              <label>Soporta 5G</label>
              <input 
                  name="has_5g" 
                  className='has-5g'
                  type="checkbox" 
                  checked={specsData.has_5g} 
                  onChange={handleChange} 
                />
            </div>
            
            <div className="form-group">
              <label>Calificación (0-10)</label>
              <input 
                name="calification" 
                type="number" 
                step="0.1" 
                min="0" 
                max="10"
                value={specsData.calification} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Calidad-Precio (0-10)</label>
              <input 
                name="cal_pri_qua" 
                type="number" 
                step="0.1" 
                min="0" 
                max="10"
                value={specsData.cal_pri_qua} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/phones')} 
            className="cancel-btn"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Teléfono'}
          </button>
        </div>
      </form>
    </div>
  );
}