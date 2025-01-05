import { IConfigDocumentoImpreso } from "../../config-documento-impreso/models/configDocumentoImpreso"
import { IEmpresa } from "../../empresa/models/empresa"

export interface ISucursal {
  configDocumentoImpreso: IConfigDocumentoImpreso,
  departamento: string,
  direccion: string,
  empresa: IEmpresa
  estado: boolean,
  idSucursal: number,
  nombreSucur: string,
  provincia: string
}

export interface ISucursalRequest {
  departamento: string,
  direccion: string,
  estado: boolean,
  idConfigDocumentoImpreso: number,
  idEmpresa: number,
  idSucursal: number,
  nombreSucur: string,
  provincia: string
}
