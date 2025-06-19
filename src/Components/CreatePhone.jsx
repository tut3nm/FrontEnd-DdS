import { useState, useEffect } from 'react';
import { create, getAll } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreatePhone() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    model: '',
    code: '',
    brand_id: '',
    release_date: '',
    age: '',
    price: '',
    specs: {
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
    }
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getAll('brands');
        setBrands(response.data);
      } catch (error) {
        console.error('Error al cargar marcas:', error);
      }
    };
    fetchBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('specs.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [key]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value,
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const phoneData = {
        model: formData.model,
        code: formData.code,
        brand_id: formData.brand_id,
        release_date: formData.release_date,
        age: formData.age ? parseInt(formData.age) : null,
        price: parseFloat(formData.price) || 0,
        specs: {
          ...formData.specs,
          batery: formData.specs.batery ? parseInt(formData.specs.batery) : null,
          charge: formData.specs.charge ? parseInt(formData.specs.charge) : null,
          ram: formData.specs.ram ? parseInt(formData.specs.ram) : null,
          storage: formData.specs.storage ? parseInt(formData.specs.storage) : null,
          weight: formData.specs.weight ? parseInt(formData.specs.weight) : null,
          display_ppp: formData.specs.display_ppp ? parseInt(formData.specs.display_ppp) : null,
          display_freq: formData.specs.display_freq ? parseInt(formData.specs.display_freq) : null,
          calification: formData.specs.calification ? parseFloat(formData.specs.calification) : null,
          cal_pri_qua: formData.specs.cal_pri_qua ? parseFloat(formData.specs.cal_pri_qua) : null,
          display_inch: formData.specs.display_inch ? parseFloat(formData.specs.display_inch) : null
        }
      };

      const response = await create('phones', phoneData);
      
      if (response) {
        alert('Teléfono creado exitosamente!');
        navigate('/phones');
      }
    } catch (error) {
      console.error('Error al crear celular:', error);
      alert(`Error al crear el celular: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="phone-form">
        <h2>Crear Nuevo Celular</h2>
        
        <div className="form-section">
          <h3>Información Básica</h3>
          
          <div className="form-group">
            <label>Modelo*</label>
            <input 
              name="model" 
              value={formData.model} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Código</label>
            <input 
              name="code" 
              value={formData.code} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Marca*</label>
            <select
              name="brand_id"
              value={formData.brand_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una marca</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Fecha de Lanzamiento*</label>
            <input 
              name="release_date" 
              type="date" 
              value={formData.release_date} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Edad (meses)</label>
            <input 
              name="age" 
              type="number" 
              min="0"
              value={formData.age} 
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
              value={formData.price} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Especificaciones Técnicas</h3>
          
          <div className="specs-grid">
            <div className="form-group">
              <label>Cámara Principal</label>
              <input 
                name="specs.cam_1" 
                value={formData.specs.cam_1} 
                onChange={handleChange} 
                placeholder="Ej: 50MP f/1.8"
              />
            </div>
            
            <div className="form-group">
              <label>Cámara 2</label>
              <input 
                name="specs.cam_2" 
                value={formData.specs.cam_2} 
                onChange={handleChange} 
                placeholder="Ej: 12MP ultra wide"
              />
            </div>
            
            <div className="form-group">
              <label>Cámara 3</label>
              <input 
                name="specs.cam_3" 
                value={formData.specs.cam_3} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Cámara 4</label>
              <input 
                name="specs.cam_4" 
                value={formData.specs.cam_4} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Cámara Frontal</label>
              <input 
                name="specs.cam_front" 
                value={formData.specs.cam_front} 
                onChange={handleChange} 
                placeholder="Ej: 12MP f/2.2"
              />
            </div>

            <div className="form-group">
              <label>Chipset</label>
              <input 
                name="specs.chipset" 
                value={formData.specs.chipset} 
                onChange={handleChange} 
                placeholder="Ej: Snapdragon 8 Gen 2"
              />
            </div>
            
            <div className="form-group">
              <label>RAM (GB)</label>
              <input 
                name="specs.ram" 
                type="number" 
                min="0"
                value={formData.specs.ram} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Almacenamiento (GB)</label>
              <input 
                name="specs.storage" 
                type="number" 
                min="0"
                value={formData.specs.storage} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Tecnología de Pantalla</label>
              <input 
                name="specs.display_tec" 
                value={formData.specs.display_tec} 
                onChange={handleChange} 
                placeholder="Ej: AMOLED"
              />
            </div>
            
            <div className="form-group">
              <label>PPP de Pantalla</label>
              <input 
                name="specs.display_ppp" 
                type="number" 
                min="0"
                value={formData.specs.display_ppp} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Pulgadas de Pantalla</label>
              <input 
                name="specs.display_inch" 
                type="number" 
                step="0.1" 
                min="0"
                value={formData.specs.display_inch} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Frecuencia (Hz)</label>
              <input 
                name="specs.display_freq" 
                type="number" 
                min="0"
                value={formData.specs.display_freq} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Batería (mAh)</label>
              <input 
                name="specs.batery" 
                type="number" 
                min="0"
                value={formData.specs.batery} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Carga (W)</label>
              <input 
                name="specs.charge" 
                type="number" 
                min="0"
                value={formData.specs.charge} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Sistema Operativo</label>
              <input 
                name="specs.os" 
                value={formData.specs.os} 
                onChange={handleChange} 
                placeholder="Ej: Android 13"
              />
            </div>
            
            <div className="form-group">
              <label>Dimensiones</label>
              <input 
                name="specs.dimensions" 
                value={formData.specs.dimensions} 
                onChange={handleChange} 
                placeholder="Ej: 146.7 x 71.5 x 7.9 mm"
              />
            </div>
            
            <div className="form-group">
              <label>Peso (g)</label>
              <input 
                name="specs.weight" 
                type="number" 
                min="0"
                value={formData.specs.weight} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group full-width">
              <label>Especificaciones de Video</label>
              <textarea 
                name="specs.video_specs" 
                value={formData.specs.video_specs} 
                onChange={handleChange} 
                placeholder="Ej: 8K@24fps, 4K@60fps"
                rows="3"
              />
            </div>
            
            <div className="form-group checkbox-group">
              <label>
                <input 
                  name="specs.has_5g" 
                  type="checkbox" 
                  checked={formData.specs.has_5g} 
                  onChange={handleChange} 
                />
                Soporta 5G
              </label>
            </div>
            
            <div className="form-group">
              <label>Calificación (0-10)</label>
              <input 
                name="specs.calification" 
                type="number" 
                step="0.1" 
                min="0" 
                max="10"
                value={formData.specs.calification} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Calidad-Precio (0-10)</label>
              <input 
                name="specs.cal_pri_qua" 
                type="number" 
                step="0.1" 
                min="0" 
                max="10"
                value={formData.specs.cal_pri_qua} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/phones')} className="cancel-btn">
            Cancelar
          </button>
          <button type="submit" className="submit-btn">
            Guardar Teléfono
          </button>
        </div>
      </form>
    </div>
  );
}