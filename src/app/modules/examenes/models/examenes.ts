export interface IExamen {
  idAnalisis?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: boolean;
}


export interface IExamenResponse {
  mensaje: string;
  error: string;
  idGenerado: number;
}
