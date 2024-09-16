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
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex flex-col">
        <label htmlFor="sku" className="mb-1 font-semibold text-left">
          SKU:
        </label>
        <input
          id="sku"
          type="text"
          name="sku"
          value={formValues.sku}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="nombre" className="mb-1 font-semibold text-left">
          Nombre:
        </label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={formValues.nombre}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="nombreExtranjero" className="mb-1 font-semibold text-left">
          Nombre Extranjero:
        </label>
        <input
          id="nombreExtranjero"
          type="text"
          name="nombreExtranjero"
          value={formValues.nombreExtranjero || ''}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="cod_grupo_producto" className="mb-1 font-semibold text-left">
          Código Grupo Producto:
        </label>
        <select
          id="cod_grupo_producto"
          name="cod_grupo_producto"
          value={formValues.codGrupoProducto || ''}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded bg-white"
        >
          <option value="">Seleccionar</option>
          {grupos.map((grupo) => (
            <option key={grupo.cod_grupo_producto} value={grupo.cod_grupo_producto}>
              {grupo.nombre_grupo_producto}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="id_fabricante" className="mb-1 font-semibold text-left">
          Fabricante:
        </label>
        <select
          id="id_fabricante"
          name="id_fabricante"
          value={formValues.idFabricante}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded bg-white"
        >
          <option value="">Seleccionar</option>
          {fabricantes.map((fabricante) => (
            <option key={fabricante.id} value={fabricante.id}>
              {fabricante.nombre_fabricante}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="id_proveedor" className="mb-1 font-semibold text-left">
          Proveedor:
        </label>
        <select
          id="id_proveedor"
          name="id_proveedor"
          value={formValues.idProveedor}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded bg-white"
        >
          <option value="">Seleccionar</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id} value={proveedor.id}>
              {proveedor.nombre_proveedor}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="peso" className="mb-1 font-semibold text-left">
          Peso:
        </label>
        <input
          id="peso"
          type="number"
          name="peso"
          value={formValues.peso}
          onChange={handleChange}
          step="0.01"
          required
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="id_unidad_medida" className="mb-1 font-semibold text-left">
          Unidad de Medida:
        </label>
        <select
          id="id_unidad_medida"
          name="id_unidad_medida"
          value={formValues.idUnidadMedida}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded bg-white"
        >
          <option value="">Seleccionar</option>
          {UNIDADES.map((unidad) => (
            <option key={unidad.id} value={unidad.id}>
              {unidad.unidad}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="precio_lista" className="mb-1 font-semibold text-left">
          Precio Lista:
        </label>
        <input
          id="precio_lista"
          type="number"
          name="precio_lista"
          value={formValues.precioLista}
          onChange={handleChange}
          step="0.01"
          required
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="cod_barra" className="mb-1 font-semibold text-left">
          Código Barra:
        </label>
        <input
          id="cod_barra"
          type="text"
          name="cod_barra"
          value={formValues.codBarra || ''}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="sku_alternante" className="mb-1 font-semibold text-left">
          SKU Alternante:
        </label>
        <input
          id="sku_alternante"
          type="text"
          name="sku_alternante"
          value={formValues.skuAlternante || ''}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Registrar Producto
      </button>
    </form>
  );
};

export default ProductForm;
