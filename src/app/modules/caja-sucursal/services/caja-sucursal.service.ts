import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMovimientoCaja, IMovimientosCaja } from '../models/movimiento-caja.interface';
import { Observable } from 'rxjs';
import { IResumenCaja } from '../models/resumen-caja.interface';

@Injectable({
  providedIn: 'root'
})
export class CajaSucursalService {

  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  insert(header: IMovimientoCaja): Observable<IMovimientoCaja> {
    return this.httpClient.post<IMovimientoCaja>(`${this.URLServicio}movimientocaja/insert/movimientoCaja`, header);
  }

  getByIdCaja(id: number):Observable<IMovimientosCaja[]> {
    return this.httpClient.get<IMovimientosCaja[]>(`${this.URLServicio}movimientocaja/getByIdCaja/${id}`);
  }

  delete(id: number):Observable<IMovimientosCaja[]> {
    return this.httpClient.post<IMovimientosCaja[]>(`${this.URLServicio}movimientocaja/delete/${id}`, id);
  }

  getResumenByIdCaja(params: any):Observable<IResumenCaja[]> {
    return this.httpClient.post<IResumenCaja[]>(`${this.URLServicio}caja/getResumenByIdCaja`, params);
  }

  updateCaja(id: number):Observable<any> {
    return this.httpClient.put<any>(`${this.URLServicio}caja/update/abrircerrarcaja/${id}`, id);
  }
}
