import { IUsuario } from "src/app/modules/usuario/models/usuario"
import { IItemMenu } from "src/app/shared/components/sidebar/models/sidebar";

export interface IAuth {
  contrasena: string,
  usuario: string
}

export interface IAuthSuccess {
  usuario: IUsuario[],
  permisos: IItemMenu[],
  mensaje: string
}

export class IAuthSuccessModel {
  usuario: IUsuario[];
  permisos: IItemMenu[];
  mensaje: string;

  constructor(authSucces: IAuthSuccess) {
    this.usuario = authSucces.usuario;
    this.permisos = authSucces.permisos;
    this.mensaje = authSucces.mensaje
  }
}
