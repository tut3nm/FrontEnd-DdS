import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { create, getAll } from '../services/api';
import '../styles/create.css'

export default function CreateWatch() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    if (name in specsData) {
      setSpecsData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
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
    setIsSubmitting(true);

    const newErrors = {};
    if (!formData.model) newErrors.model = 'Modelo es requerido';
    if (!formData.brand_id) newErrors.brand_id = 'Marca es requerida';
    if (!formData.price) newErrors.price = 'Precio es requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const watchResponse = await create('watches', formData);
      const watchId = watchResponse.data.id;
      
      const hasSpecsData = Object.values(specsData).some(
        value => (typeof value === 'boolean' && value) || 
                (typeof value !== 'boolean' && value !== '')
      );
      
      if (hasSpecsData) {
        await create(`watchSpecs/${watchId}`, specsData);
      }
      
      navigate('/watches');
    } catch (error) {
      console.error('Error creating watch:', error);
      alert('Error al crear reloj: ' + (error.message || 'Error desconocido'));
    } finally {
      setIsSubmitting(false);
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
              name="chipset"
              value={specsData.chipset}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Tecnología de Pantalla</label>
            <input
              name="display_tec"
              value={specsData.display_tec}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>PPP de Pantalla</label>
            <input
              type="number"
              name="display_ppp"
              value={specsData.display_ppp}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Pulgadas de Pantalla</label>
            <input
              type="number"
              step="0.1"
              name="display_inch"
              value={specsData.display_inch}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Batería (mAh)</label>
            <input
              type="number"
              name="batery"
              value={specsData.batery}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Sistema Operativo</label>
            <input
              name="os"
              value={specsData.os}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>RAM (MB)</label>
            <input
              type="number"
              name="ram"
              value={specsData.ram}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Almacenamiento (MB)</label>
            <input
              type="number"
              name="storage"
              value={specsData.storage}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Dimensiones</label>
            <input
              name="dimensions"
              value={specsData.dimensions}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Peso (g)</label>
            <input
              type="number"
              name="weight"
              value={specsData.weight}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                name="has_sim"
                checked={specsData.has_sim}
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
              name="calification"
              value={specsData.calification}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Calidad-Precio</label>
            <input
              type="number"
              step="0.1"
              name="cal_pri_qua"
              value={specsData.cal_pri_qua}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <button type="button" onClick={() => navigate('/watches')} disabled={isSubmitting}>
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}