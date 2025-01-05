export interface IAlmacenCentral {
  descripcion: string,
  estado: string,
  estadostocks: string,
  idproducto: string,
  stockTotal: string,
  stockmingeneral: string
}

export interface IDetalleAlmacenCentral {
  descripcion: string,
  estado: string,
  fechaIngreso: string,
  idAlmacenCentral: string,
  lote: string,
  precioCompra: string,
  stockActual: string,
  unidadMedida: string
}

