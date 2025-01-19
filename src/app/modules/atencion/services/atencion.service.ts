import { Injectable } from '@angular/core';
import { IAtencion } from '../models/atencion';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/global/response';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  URLServicio: string = environment.URLTienda;


  constructor( private httpClient:HttpClient) { }

  getAllActivos():Observable<IAtencion[]> {
      return this.httpClient.get<IAtencion[]>(`${this.URLServicio}atencion/getAllActive`)
    }
  
    insert(header: IAtencion):Observable<IAtencion> {
      return this.httpClient.post<IAtencion>(`${this.URLServicio}atencion/insert/atencion`, header);
    }
  
    getFindById(id: number):Observable<IAtencion[]> {
      return this.httpClient.get<IAtencion[]>(`${this.URLServicio}atencion/findById/${id}`)
    }
  
    update(id: number, header: IAtencion):Observable<IResponse> {
      return this.httpClient.put<IResponse>(`${this.URLServicio}atencion/update/${id}`, header);
    }
  
    setInactive(id: number):Observable<IResponse> {
      return this.httpClient.put<IResponse>(`${this.URLServicio}atencion/setInactive/${id}`, id);
    }
}
