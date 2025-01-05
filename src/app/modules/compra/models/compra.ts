import { IEmpresa } from "../../empresa/models/empresa"
import { IProveedor } from "../../proveedor/models/proveedor"

export interface IProducto {
  categoria: string,
  codigo: string,
  descripcion: string,
  detalle: string,
  estado: true,
  fechaModificacion: string,
  fechaRegistro: string,
  idProducto: number,
  marca: string,
  stockMinGeneral: number,
  stockMinTienda: number,
  subCategoria: string,
  unidadMedida: string
}

export interface ICompra {
  asunto: string,
  descripcion: string,
  estado: boolean,
  estadoCompra: string,
  fecha: string,
  fechaModificacion: string,
  fechaRecepcion: string,
  fechaRegistro: string,
  idCompra: number,
  idEmpresa: number,
  idProveedor: number,
  numCompro: string,
  serieCompro: string,
  tipoCompro: string,
  tipoMoneda: string,
  tipoPago: string,
  totalCompra: number
}

export interface IDetalleCompra {
  cantidad: number,
  codigo: number,
  estado: boolean,
  idCompra: number,
  idDetalleCompra: number,
  idProducto: number,
  precioCompra: number
}

export interface IListaCompra {
  asunto: string,
  descripcion: string,
  empresa: IEmpresa,
  estado: true,
  estadoCompra: string,
  fecha: string,
  fechaModificacion: string,
  fechaRecepcion: string,
  fechaRegistro: string,
  idCompra: number,
  numCompro: string,
  proveedor: IProveedor,
  serieCompro: string,
  tipoCompro: string,
  tipoMoneda: string,
  tipoPago: string,
  totalCompra: number
}
