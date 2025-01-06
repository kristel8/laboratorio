
import { IEmpleado } from "../../empleado/models/empleado"

export interface IUsuario {
  empleado: string,
  contrasena: string,
  idEmpleado: IEmpleado,
  estado: boolean,
  idUsuario: number,
  idCaja: number,
  isCaja: boolean,
  idConfigDocumentoImpreso: number,
  tipoUsuario: string,
  usuario: string
}

export interface IUsuarioSave {
  contrasena: string,
  estado: boolean,
  idEmpleado: number,
  idSucursal: number,
  idUsuario: number,
  isCaja: boolean,
  tipoUsuario: string,
  usuario: string
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
  idDetallePermisos: number,
  idMenu: number,
  idUsuario: number
}
