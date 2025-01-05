export interface IMovimientoCaja {
  cantidad: number,
  descripcion: string,
  idCaja: number,
  idmovimientocaja: number,
  tipoMovimiento: string
}

export interface IMovimientosCaja {
  cantidad: number,
  descripcion: string,
  estado: string,
  fecha: string,
  idCaja: number,
  idmovimientocaja: number,
  tipoMovimiento: string,
}
