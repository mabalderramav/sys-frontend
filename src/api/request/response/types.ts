// src/types.ts

export interface Fabricante {
  id: number;
  skuFabricante: string;
  nombreFabricante: string;
}

export interface Proveedor {
  id: number;
  skuProveedor: string;
  nombreProveedor: string;
}

export interface GrupoProducto {
  id: number;
  codGrupoProducto: string;
  nombreGrupoProducto: string;
}

export interface UnidadMedida {
  id: number;
  unidad: string;
}
