export interface ProductRequest {
  sku: string;
  nombre: string;
  nombreExtranjero?: string;
  codGrupoProducto: string;
  idFabricante: number;
  idProveedor: number;
  peso: number;
  idUnidadMedida: number;
  precioLista: number;
  codBarra?: string;
  skuAlternante?: string;
}

export interface ClientRequest {
  code: string;
  name: string;
  ciNit: string;
  documentType: string;
  email: string;
}
