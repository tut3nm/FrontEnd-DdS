import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { create, getAll } from '../services/api';

export default function CreateWatch() {
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
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const response = await getAll('brands');
        setBrands(response.data);
      } catch (error) {
        console.error('Error loading brands:', error);
      }
    };
    loadBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('specs.')) {
      const fieldName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [fieldName]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.model) newErrors.model = 'Modelo es requerido';
    if (!formData.brand_id) newErrors.brand_id = 'Marca es requerida';
    if (!formData.price) newErrors.price = 'Precio es requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await create('watches', formData);
      navigate('/watches');
    } catch (error) {
      console.error('Error creating watch:', error);
      alert('Error al crear reloj: ' + (error.message || 'Error desconocido'));
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Reloj</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Información Básica</h3>
          
          <div>
            <label>Modelo*</label>
            <input
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            {errors.model && <span>{errors.model}</span>}
          </div>

          <div>
            <label>Código</label>
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Marca*</label>
            <select
              name="brand_id"
              value={formData.brand_id}
              onChange={handleChange}
            >
              <option value="">Seleccionar marca</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
            {errors.brand_id && <span>{errors.brand_id}</span>}
          </div>

          <div>
            <label>Fecha de Lanzamiento</label>
            <input
              type="date"
              name="release_date"
              value={formData.release_date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Edad (meses)</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Precio*</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <span>{errors.price}</span>}
          </div>
        </div>

        <div>
          <h3>Especificaciones Técnicas</h3>
          
          <div>
            <label>Chipset</label>
            <input
              name="specs.chipset"
              value={formData.specs.chipset}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Tecnología de Pantalla</label>
            <input
              name="specs.display_tec"
              value={formData.specs.display_tec}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>PPP de Pantalla</label>
            <input
              type="number"
              name="specs.display_ppp"
              value={formData.specs.display_ppp}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Pulgadas de Pantalla</label>
            <input
              type="number"
              step="0.1"
              name="specs.display_inch"
              value={formData.specs.display_inch}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Batería (mAh)</label>
            <input
              type="number"
              name="specs.batery"
              value={formData.specs.batery}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Sistema Operativo</label>
            <input
              name="specs.os"
              value={formData.specs.os}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>RAM (MB)</label>
            <input
              type="number"
              name="specs.ram"
              value={formData.specs.ram}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Almacenamiento (MB)</label>
            <input
              type="number"
              name="specs.storage"
              value={formData.specs.storage}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Dimensiones</label>
            <input
              name="specs.dimensions"
              value={formData.specs.dimensions}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Peso (g)</label>
            <input
              type="number"
              name="specs.weight"
              value={formData.specs.weight}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                name="specs.has_sim"
                checked={formData.specs.has_sim}
                onChange={handleChange}
              />
              Tiene SIM
            </label>
          </div>

          <div>
            <label>Calificación</label>
            <input
              type="number"
              step="0.1"
              name="specs.calification"
              value={formData.specs.calification}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Calidad-Precio</label>
            <input
              type="number"
              step="0.1"
              name="specs.cal_pri_qua"
              value={formData.specs.cal_pri_qua}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <button type="button" onClick={() => navigate('/watches')}>
            Cancelar
          </button>
          <button type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}