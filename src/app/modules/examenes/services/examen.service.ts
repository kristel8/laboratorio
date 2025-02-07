import { Injectable } from '@angular/core';
import { IExamen, IExamenResponse } from '../models/examenes';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IResponse, IResponseTicket } from 'src/app/global/response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  getAllActivos():Observable<IExamen[]> {
    return this.httpClient.get<IExamen[]>(`${this.URLServicio}analisis/getAllActive`)
  }

  insert(header: IExamen):Observable<IExamenResponse> {
    return this.httpClient.post<IExamenResponse>(`${this.URLServicio}analisis/insert/analisis`, header);
  }

  getFindById(id: number):Observable<IExamen[]> {
    return this.httpClient.get<IExamen[]>(`${this.URLServicio}analisis/findById/${id}`)
  }

  update(id: number, header: IExamen):Observable<IResponse> {
    return this.httpClient.put<IResponse>(`${this.URLServicio}analisis/update/${id}`, header);
  }

  setInactive(id: number):Observable<IResponse> {
    return this.httpClient.put<IResponse>(`${this.URLServicio}analisis/setInactive/${id}`, id);
  }

  generarExamenPlantilla(idAnalisis: any): Observable<any> {
    return this.httpClient.get<IResponseTicket>(`${this.URLServicio}analisis/getViewPDFAnalisis/${idAnalisis}`).pipe(
      map((response) => response.data[0])
    );;
  }
}
