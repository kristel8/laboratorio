import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAlmacenSucursal, IDetalleAlmacenSucursal } from '../models/almacen-sucursal';

@Injectable({
  providedIn: 'root'
})
export class AlmacenSucursalService {
  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient ) { }

  getReporteAlmacenSucursalProducto(idSucursal: string):Observable<IAlmacenSucursal[]> {
    return this.httpClient.get<IAlmacenSucursal[]>(`${this.URLServicio}almacensucursal/reporteAlmacenSucursalProducto/${idSucursal}`);
  }

  getReporteAlmacenCentralProductoLote(idSucursal: string, idProducto: string):Observable<IDetalleAlmacenSucursal[]> {
    return this.httpClient.get<IDetalleAlmacenSucursal[]>(`${this.URLServicio}almacensucursal/reporteAlmacenCentralProductoLote/${idSucursal}/${idProducto}`);
  }

  setIsParaVenderActive(idAlmacenSucursal: number):Observable<any[]> {
    return this.httpClient.put<any[]>(`${this.URLServicio}almacensucursal/setIsParaVenderActive/${idAlmacenSucursal}`, idAlmacenSucursal);
  }

}
