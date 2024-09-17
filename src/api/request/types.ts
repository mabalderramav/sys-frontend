export interface ProductRequest {
  sku: string;
  nombre: string;
  nombre_extranjero?: string;
  cod_grupo_producto: string;
  id_fabricante: number;
  id_proveedor: number;
  peso: number;
  id_unidad_medida: number;
  precio_lista: number;
  cod_barra?: string;
  sku_alternante?: string;
}
