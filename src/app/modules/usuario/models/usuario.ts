
import { IEmpleado } from "../../empleado/models/empleado"
import { ISucursal } from "../../sucursal/models/sucursal"

export interface IUsuario {
  idUsuario?: number,
  usuario: string;
  contrasena: string;
  tipoUsuario: string;
  estado?: boolean,
  idEmpleado: number,
  apellidoYNombre?: string;
  idGenerado?: number;
}


export interface ITipoUsuario {
  tipoUsuario: string,
}

export interface IMenu {
  estado: boolean,
  idMenu: number,
  imagen: string,
  nombre: string,
  ruta: string
}

export interface IDetallePermiso {
  idMenu: number,
  idUsuario: number
}
