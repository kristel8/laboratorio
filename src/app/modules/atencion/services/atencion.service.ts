import { Injectable } from '@angular/core';
import { IAtencion, IAtencionLista, IAtencionResponse } from '../models/atencion';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/global/response';
import { environment } from 'src/environments/environment';
import { IAtencionAnalisis } from '../models/atencion-analisis';


@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  URLServicio: string = environment.URLTienda;


  constructor(private httpClient: HttpClient) { }

  getAllActivos(): Observable<IAtencionLista[]> {
    return this.httpClient.get<IAtencionLista[]>(`${this.URLServicio}atencion/getAllActive`)
  }

  insert(header: IAtencion): Observable<IAtencionResponse> {
    return this.httpClient.post<IAtencionResponse>(`${this.URLServicio}atencion/insert/atencion`, header);
  }

  insertAnalisis(header: IAtencionAnalisis[]): Observable<IAtencionResponse> {
    return this.httpClient.post<IAtencionResponse>(`${this.URLServicio}atencionanalisis/insert/atencionanalisis`, header);
  }

  getFindById(id: number): Observable<IAtencion[]> {
    return this.httpClient.get<IAtencion[]>(`${this.URLServicio}atencion/findById/${id}`)
  }

  update(id: number, header: IAtencion): Observable<IResponse> {
    return this.httpClient.put<IResponse>(`${this.URLServicio}atencion/update/${id}`, header);
  }

  setInactive(id: number): Observable<IResponse> {
    return this.httpClient.put<IResponse>(`${this.URLServicio}atencion/setInactive/${id}`, id);
  }
}
