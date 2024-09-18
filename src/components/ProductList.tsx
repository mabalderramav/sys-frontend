import { useFetchProductsQuery } from '../api/productsApi';

const ProductList: React.FC = () => {
  const { data: products = [], isLoading, error } = useFetchProductsQuery();
  if (isLoading) {
    return <div>Loading products...</div>;
  }
  if (error) {
    return <div>Failed to load products.</div>;
  }
  return (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">SKU</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Fabricante</th>
              <th className="px-4 py-2 text-left">Proveedor</th>
              <th className="px-4 py-2 text-left">Precio Lista</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index: number) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{product.sku}</td>
                <td className="px-4 py-2">{product.nombre}</td>
                <td className="px-4 py-2">{product.id_fabricante}</td>
                <td className="px-4 py-2">{product.id_proveedor}</td>
                <td className="px-4 py-2">{product.precio_lista}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ProductList;
