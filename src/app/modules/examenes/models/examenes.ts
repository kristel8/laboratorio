export interface IExamen {
  idAnalisis?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: boolean;
  duracion: string;
}


export interface IExamenResponse {
  mensaje: string;
  error: string;
  idGenerado: number;
}
