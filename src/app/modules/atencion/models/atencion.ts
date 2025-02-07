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

export interface IAtencionSeleccionado {
  dni: string;
  apellidos: string;
  nombres: string;
  genero: string;
  fechaNacimiento: string;
  email: string;
  celular: string;
  direccion: string;
  antecedentes: string;
  idDoctor: number;
  doctor: string;
  idAnalisis: number[];
}
