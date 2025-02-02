export interface IAtencion {
  idAtencion?: number;
  idUsuario?: number;
  fecha: Date;
  idPaciente: number;
  estadoOrden: string;
  estado: boolean;
  idDoctor: number;
}

export interface IAtencionResponse {
  mensaje: string;
  error: string;
  idGenerado: number;
}

export interface IAtencionLista {
  idAtencion: number;
  idUsuario: number;
  usuario: string;
  fecha: string;
  idPaciente: number;
  apellidoYNombrePaciente: string;
  estadoOrden: string;
  estado: true;
  idDoctor: number;
  apellidoYNombreDoctor: string;
}
