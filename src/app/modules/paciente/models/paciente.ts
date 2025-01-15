export interface IPaciente{
  idPaciente?: number,
  tipoDocumento: string;
  numDocumento: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  genero: string;
  direccion: string;
  celular: string;
  email: string;
  fechaIngreso?: string;
  estado: boolean;
  antecedentes: string;
}
