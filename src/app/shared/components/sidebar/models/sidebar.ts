
export interface IItemMenu {
  nombre: string;
  ruta: string;
  estado: string;
  imagen?: string;
  subMenu: IItemSubMenu[];
}

export interface IItemSubMenu {
  nombre: string;
  ruta: string;
  estado: string;
}

export interface IUserLogueado {
  imagen: string;
  nombre: string;
  rol: string;
}
