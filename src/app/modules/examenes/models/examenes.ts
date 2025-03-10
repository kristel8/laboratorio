export interface IExamen {
  idAnalisis?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: boolean;
  duracion: string;
  isUroCultivo: boolean;
}


export interface IExamenResponse {
  mensaje: string;
  error: string;
  idGenerado: number;
}
