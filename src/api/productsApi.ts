import { ProductRequest } from './request/types';
import { systemApi } from './baseQuery';
import { Fabricante, GrupoProducto, Proveedor } from './request/response/types';

const productsApi = systemApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchProductBySku: builder.query<string, string>({
      query: (sku) => ({ url: `producto/${sku}`, method: 'get' })
    }),
    createProduct: builder.mutation<
      string,
      {
        request: ProductRequest;
      }
    >({
      query: ({ request }) => ({
        url: 'producto',
        data: request,
        method: 'post'
      })
    }),
    fetchFabricantes: builder.query<Fabricante[], void>({
      query: () => ({ url: 'fabricantes', method: 'get' })
    }),
    fetchGrupos: builder.query<GrupoProducto[], void>({
      query: () => ({ url: 'grupo-producto', method: 'get' })
    }),
    fetchProveedores: builder.query<Proveedor[], void>({
      query: () => ({ url: 'proveedor', method: 'get' })
    })
  }),
  overrideExisting: false
});

export const {
  useFetchProductBySkuQuery,
  useCreateProductMutation,
  useFetchFabricantesQuery,
  useFetchGruposQuery,
  useFetchProveedoresQuery
} = productsApi;
