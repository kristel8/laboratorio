import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEnviarData } from '../models/enviarData';
@Injectable({
  providedIn: 'root'
})
export class ImportarProductoService {

  URLServicio: string = environment.URLTienda;

  constructor(private httpClient:HttpClient) { }

  importProductos(producto: IEnviarData[]):Observable<any> {
    return this.httpClient.post<any>(`${this.URLServicio}producto/import/producto`, producto);
  }

}
