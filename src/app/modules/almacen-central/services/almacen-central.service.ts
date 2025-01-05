import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAlmacenCentral, IDetalleAlmacenCentral } from '../models/almacen-central';

@Injectable({
  providedIn: 'root'
})
export class AlmacenCentralService {
  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient ) { }

  getAlmacenCentralActivos():Observable<IAlmacenCentral[]> {
    return this.httpClient.get<IAlmacenCentral[]>(`${this.URLServicio}almacencentral/reporteAlmacenCentralProducto`);
  }

  getDetalleAlmacenCentralActivos(idProducto: number):Observable<IDetalleAlmacenCentral[]> {
    return this.httpClient.get<IDetalleAlmacenCentral[]>(`${this.URLServicio}almacencentral/reporteAlmacenCentralProductoLote/${idProducto}`);
  }

  getReporteAlmacenCentralProductoLoteListado():Observable<IDetalleAlmacenCentral[]> {
    return this.httpClient.get<IDetalleAlmacenCentral[]>(`${this.URLServicio}almacencentral/reporteAlmacenCentralProductoLoteListado`);
  }
}
