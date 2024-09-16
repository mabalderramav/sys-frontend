import { useState } from 'react';
import {
  useCreateProductMutation,
  useFetchFabricantesQuery,
  useFetchGruposQuery,
  useFetchProveedoresQuery
} from '../api/productsApi';
import { ProductRequest } from '../api/request/types';

const UNIDADES = [
  { id: 1, unidad: 'Litros' },
  { id: 1, unidad: 'Kilogramos' }
];
const ProductForm: React.FC = () => {
  const { data: fabricantes = [], isLoading: fabricantesLoading } = useFetchFabricantesQuery();
  const { data: proveedores = [], isLoading: proveedoresLoading } = useFetchProveedoresQuery();
  const { data: grupos = [], isLoading: gruposLoading } = useFetchGruposQuery();
  const [createProduct] = useCreateProductMutation();
  const [formValues, setFormValues] = useState<ProductRequest>({
    sku: '',
    nombre: '',
    nombreExtranjero: '',
    codGrupoProducto: '',
    idFabricante: 0,
    idProveedor: 0,
    peso: 0,
    idUnidadMedida: 0,
    precioLista: 0,
    codBarra: '',
    skuAlternante: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === 'peso' || name === 'precio_lista' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({ request: formValues }).unwrap();
      console.log('Product registered successfully');
    } catch (error) {
      console.error('Failed to register product', error);
    }
  };

  if (fabricantesLoading || proveedoresLoading || gruposLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>SKU:</label>
        <input type="text" name="sku" value={formValues.sku} onChange={handleChange} required />
      </div>
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={formValues.nombre} onChange={handleChange} required />
      </div>
      <div>
        <label>Nombre Extranjero:</label>
        <input type="text" name="nombreExtranjero" value={formValues.nombreExtranjero || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Código Grupo Producto:</label>
        <select name="cod_grupo_producto" value={formValues.codGrupoProducto || ''} onChange={handleChange}>
          <option value="">Seleccionar</option>
          {grupos.map((grupo) => (
            <option key={grupo.codGrupoProducto} value={grupo.codGrupoProducto}>
              {grupo.nombreGrupoProducto}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Fabricante:</label>
        <select name="id_fabricante" value={formValues.idFabricante} onChange={handleChange}>
          <option value="">Seleccionar</option>
          {fabricantes.map((fabricante) => (
            <option key={fabricante.id} value={fabricante.id}>
              {fabricante.nombreFabricante}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Proveedor:</label>
        <select name="id_proveedor" value={formValues.idProveedor} onChange={handleChange}>
          <option value="">Seleccionar</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id} value={proveedor.id}>
              {proveedor.nombreProveedor}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Peso:</label>
        <input type="number" name="peso" value={formValues.peso} onChange={handleChange} step="0.01" required />
      </div>
      <div>
        <label>Unidad de Medida:</label>
        <select name="id_unidad_medida" value={formValues.idUnidadMedida} onChange={handleChange}>
          <option value="">Seleccionar</option>
          {UNIDADES.map((unidad) => (
            <option key={unidad.id} value={unidad.id}>
              {unidad.unidad}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Precio Lista:</label>
        <input
          type="number"
          name="precio_lista"
          value={formValues.precioLista}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>
      <div>
        <label>Código Barra:</label>
        <input type="text" name="cod_barra" value={formValues.codBarra || ''} onChange={handleChange} />
      </div>
      <div>
        <label>SKU Alternante:</label>
        <input type="text" name="sku_alternante" value={formValues.skuAlternante || ''} onChange={handleChange} />
      </div>
      <button type="submit">Registrar Producto</button>
    </form>
  );
};

export default ProductForm;
