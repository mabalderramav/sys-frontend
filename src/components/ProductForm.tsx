import { useState } from 'react';
import {
  useCreateProductMutation,
  useFetchFabricantesQuery,
  useFetchGruposQuery,
  useFetchProveedoresQuery,
  useFetchUnidadMedidaQuery
} from '../api/productsApi';
import { ProductRequest } from '../api/request/types';
import Notification from './Notification';

const ProductForm: React.FC = () => {
  const { data: fabricantes = [], isLoading: fabricantesLoading } = useFetchFabricantesQuery();
  const { data: proveedores = [], isLoading: proveedoresLoading } = useFetchProveedoresQuery();
  const { data: grupos = [], isLoading: gruposLoading } = useFetchGruposQuery();
  const { data: unidades = [], isLoading: unidadLoading } = useFetchUnidadMedidaQuery();

  const [createProduct] = useCreateProductMutation();
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
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
      setFormValues({
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
      setMessage('Guardado correctamente');
      setShow(true);
    } catch (error) {
      console.error('Failed to register product', error);
    }
  };

  if (fabricantesLoading || proveedoresLoading || gruposLoading || unidadLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Notification message={message} show={show} setShow={setShow} type="success" />
      <h2 className="text-xl font-semibold mb-4">New Product</h2>

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
          <label htmlFor="codGrupoProducto" className="mb-1 font-semibold text-left">
            Código Grupo Producto:
          </label>
          <select
            id="codGrupoProducto"
            name="codGrupoProducto"
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
          <label htmlFor="idFabricante" className="mb-1 font-semibold text-left">
            Fabricante:
          </label>
          <select
            id="idFabricante"
            name="idFabricante"
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
          <label htmlFor="idProveedor" className="mb-1 font-semibold text-left">
            Proveedor:
          </label>
          <select
            id="idProveedor"
            name="idProveedor"
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
          <label htmlFor="idUnidadMedida" className="mb-1 font-semibold text-left">
            Unidad de Medida:
          </label>
          <select
            id="idUnidadMedida"
            name="idUnidadMedida"
            value={formValues.idUnidadMedida}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded bg-white"
          >
            <option value="">Seleccionar</option>
            {unidades.map((unidad) => (
              <option key={unidad.id} value={unidad.id}>
                {unidad.unidad}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="precioLista" className="mb-1 font-semibold text-left">
            Precio Lista:
          </label>
          <input
            id="precioLista"
            type="number"
            name="precioLista"
            value={formValues.precioLista}
            onChange={handleChange}
            step="0.01"
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="codBarra" className="mb-1 font-semibold text-left">
            Código Barra:
          </label>
          <input
            id="codBarra"
            type="text"
            name="codBarra"
            value={formValues.codBarra || ''}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="skuAlternante" className="mb-1 font-semibold text-left">
            SKU Alternante:
          </label>
          <input
            id="skuAlternante"
            type="text"
            name="skuAlternante"
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
    </>
  );
};

export default ProductForm;
