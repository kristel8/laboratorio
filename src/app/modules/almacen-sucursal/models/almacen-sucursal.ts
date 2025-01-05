export interface IAlmacenSucursal {
  descripcion: string,
  estado: string,
  estadoStocks: string,
  idProducto: string,
  stockActual: string,
  stockMinTienda: string
}

export interface IDetalleAlmacenSucursal {
  codigoEnvio: string,
  descripcion: string,
  descuentoMaximo: string,
  estado: string,
  idAlmacenSucursal: string,
  idSucursal: string,
  isparavender: string,
  precioVenta: string,
  precioventaxMayor: string,
  recibido: string,
  stockActual: string
}
