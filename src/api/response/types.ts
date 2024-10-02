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

export interface Producto {
  sku: string;
  nombre: string;
  nombre_xtranjero?: string;
  cod_grupo_producto: string;
  id_fabricante: number;
  id_proveedor: number;
  peso: number;
  id_unidad_medida: number;
  precio_lista: number;
  cod_barra?: string;
  sku_alternante?: string;
}

export interface Client {
  id: number;
  code: string;
  name: string;
  ciNit: string;
  documentType: string;
  email: string;
}
