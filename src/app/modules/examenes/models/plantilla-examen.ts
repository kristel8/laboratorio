export interface IPlantillaExamen {
  isSubtitulo: boolean;
  idPlantillaAnalisis: number;
  descripcion: string;
  unidad: string;
  valorReferencia: string;
  estado: boolean;
  idAnalisis: number;
  tipoUroCultivo: number;
}

export interface IPlantillaExamenResponse {
  mensaje: string;
  error: string;
  idGenerado: number;
}
