export interface ICaja {
  idPago: number;
  fechaEmision: string;
  fechaPago: string;
  idAtencion: number;
  tipoPago: string;
  estadoPago: string;
  subTotal: number,
  descuentoTotal: number,
  total: number;
  apellidoYNombres: string;
  acuenta: number;
}

export interface IPagar {
  idPago: number;
  fechaEmision: string;
  subTotal: number;
  fechaPago: string;
  idAtencion: number;
  tipoPago: string;
  decuentoTotal: number;
  total: number;
  acuenta: number;
}

export interface IDetalle {
  idAnalisis: number;
  nombre: string;
  precio: number;
}
