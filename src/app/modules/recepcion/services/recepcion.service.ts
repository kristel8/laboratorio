import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRecepcion } from '../models/recepcion';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {

  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient ) { }

  getAllActive(idSucursal: string, estadoEnvio: string):Observable<IRecepcion[]> {
    return this.httpClient.get<IRecepcion[]>(`${this.URLServicio}almacensucursal/getAllActive/${idSucursal}/${estadoEnvio}`);
  }

  setCanceled(idEnvioSucursal: number):Observable<any> {
    return this.httpClient.put<any>(`${this.URLServicio}almacensucursal/setCanceled/${idEnvioSucursal}`, idEnvioSucursal);
  }

  setReceived(idSucursal: string, idEnvioSucursal: number, usuario: string ):Observable<any> {
    return this.httpClient.put<any>(`${this.URLServicio}almacensucursal/setReceived/${idSucursal}/${idEnvioSucursal}/${usuario}`, {idSucursal, idEnvioSucursal, usuario});
  }
}
