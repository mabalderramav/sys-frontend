// src/types.ts

export interface Fabricante {
  id: number;
  sku_fabricante: string;
  nombre_fabricante: string;
}

export interface Proveedor {
  id: number;
  sku_proveedor: string;
  nombre_proveedor: string;
}

export interface GrupoProducto {
  id: number;
  cod_grupo_producto: string;
  nombre_grupo_producto: string;
}

export interface UnidadMedida {
  id: number;
  unidad: string;
}
