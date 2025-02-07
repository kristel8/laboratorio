import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAtencionAprobadas, IDetalleAnalisis, IDetalleAtencion, IResultadoAtencion } from '../models/resultado';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse, IResponseTicket } from 'src/app/global/response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ResultadosService {
  URLServicio: string = environment.URLTienda;

  constructor(private httpClient: HttpClient) { }

  getAtencionAprobadas(): Observable<IAtencionAprobadas[]> {
    return this.httpClient.get<IAtencionAprobadas[]>(`${this.URLServicio}resultadoatencion/findAtencionesAprobadas`);
  }

  getFindByIdAtencion(id: number): Observable<IDetalleAtencion[]> {
    return this.httpClient.get<IDetalleAtencion[]>(`${this.URLServicio}resultadoatencion/getAtencionAnalisisByAtencion/${id}`);
  }

  getFindByIdAnalisis(id: number): Observable<IDetalleAnalisis[]> {
    return this.httpClient.get<IDetalleAnalisis[]>(`${this.URLServicio}resultadoatencion/findByIdAnalisis/${id}`);
  }

  insert(resultado: IResultadoAtencion[]): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${this.URLServicio}resultadoatencion/insert`, resultado);
  }

  update(resultado: IResultadoAtencion[]): Observable<IResponse> {
    return this.httpClient.put<IResponse>(`${this.URLServicio}resultadoatencion/update`, resultado);
  }


  generarReporte(idAtencion: number, isFirma: number): Observable<any> {
    const params = new HttpParams().set('isFirma', isFirma);

    return this.httpClient.get<IResponseTicket>(`${this.URLServicio}atencion/getAnalisisPDFMerge/${idAtencion}`, { params }).pipe(
      map((response) => response.data[0])
    );;
  }
}
