export interface IAtencionAprobadas {
  idAtencion: number;
  apellidosYNombres: string;
  usuario: string;
  numeroCelular: string;
  fecha: string;
}

export interface IDetalleAtencion {
  idAtencionAnalisis: number;
  idAnalisis: number;
  idAtencion: number;
  examen: string;
  fechaCreacion: string;
  fechaModificacion: string;
  usuario: string;
  estadoAtencionAnalisis: string;
}

export interface IDetalleAnalisis {
  idResultadoAtencion: number;
  idPlantillaAnalisis: number;
  descripcion: string;
  unidad: string;
  valorReferencial: string;
  resultado: number;
  idAtencionAnalisis: number;
}

export interface IResultadoAtencion {
  idResultadoAtencion: number;
  idPlantillaAnalisis: number;
  resultado: number;
  idAtencionAnalisis: number;
}
