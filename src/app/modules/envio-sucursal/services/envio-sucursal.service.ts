import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEnvioSucursal } from '../models/envio-sucursal';

@Injectable({
  providedIn: 'root'
})
export class EnvioSucursalService {
  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient ) { }

  getEnvioSucursalActivos():Observable<IEnvioSucursal[]> {
    return this.httpClient.get<IEnvioSucursal[]>(`${this.URLServicio}enviosucursal/getAllActive`);
  }

  deleteEnvioSucursal(id: number):Observable<IEnvioSucursal[]> {
    return this.httpClient.delete<IEnvioSucursal[]>(`${this.URLServicio}enviosucursal/delete/${id}`);
  }

  inserEnvioSucural(envioSucursal: IEnvioSucursal):Observable<IEnvioSucursal> {
    return this.httpClient.post<IEnvioSucursal>(`${this.URLServicio}enviosucursal/insert/envioSucursal`, envioSucursal);
  }
}
