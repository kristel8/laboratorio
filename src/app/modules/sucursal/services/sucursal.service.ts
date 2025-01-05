import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISucursal, ISucursalRequest } from '../models/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient ) { }

  getSucursalActivos():Observable<ISucursal[]> {
    return this.httpClient.get<ISucursal[]>(`${this.URLServicio}sucursal/getAllActive`);
  }

  insertSucursal(sucursal: ISucursalRequest):Observable<ISucursalRequest> {
    return this.httpClient.post<ISucursalRequest>(`${this.URLServicio}sucursal/insert/sucursal`, sucursal);
  }

  updateSucursal(id: number, sucursal: ISucursalRequest):Observable<ISucursalRequest> {
    return this.httpClient.put<ISucursalRequest>(`${this.URLServicio}sucursal/update/${id}`, sucursal);
  }


  deleteCompra(id: number):Observable<ISucursal[]> {
    return this.httpClient.put<ISucursal[]>(`${this.URLServicio}sucursal/setInactive/${id}`, id);
  }

  getFindByIdSucursal(id: number):Observable<ISucursal[]> {
    return this.httpClient.get<ISucursal[]>(`${this.URLServicio}sucursal/findById/${id}`);
  }
}
