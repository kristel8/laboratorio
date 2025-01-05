import { ICliente } from "../../cliente/models/cliente"
import { ISucursal } from "../../sucursal/models/sucursal"
import { IUsuario } from "../../usuario/models/usuario"


export interface IVentas {
  cantidadPago: number,
  cliente: ICliente,
  estado: boolean,
  estadoVenta: string,
  fecha: string,
  fechaCreacion: string,
  fechaModificacion: string,
  idVenta: number,
  numCompro: string,
  serieCompro: string,
  sucursal: ISucursal,
  tipoComprobante: string,
  tipoMoneda: string,
  tipoPago: string,
  totalVenta: number,
  usuario: IUsuario,
  vuelto: number,
  datosCliente?: string;
}

export interface IVenta {
  cantidadPago: number,
  estado?: boolean,
  estadoVenta?: string,
  fecha?: string,
  fechaCreacion?: string,
  fechaModificacion?: string,
  idCliente: number,
  idConfigDocumentoImpreso: number,
  idSucursal: number,
  idUsuario: number,
  idVenta: number,
  numCompro: string,
  serieCompro: string,
  tipoComprobante: string,
  tipoMoneda: string,
  tipoPago: string,
  totalVenta: number,
  vuelto: number
}

export interface IProductoVenta {
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

export interface IDetalleVenta {
    idDetalleVenta: number,
    idVenta?: number,
    idAlmacenSucursal: number,
    descripcion?: string,
    cantidad: number,
    precio: number,
    descuento: number,
    total?: number
}


export interface IListDetalleVenta {
  detalleVenta: IDetalleItemVenta[],
  mensaje: string,
  totalVenta: string,
}

export interface IDetalleItemVenta {
  descripcion?: string,
  cantidad: string,
  precio: string,
}

export interface IComprobanteVenta {
  comprobante?: IFile,
  mensaje?: string,
}

export interface IFile {
  file?: string
}
