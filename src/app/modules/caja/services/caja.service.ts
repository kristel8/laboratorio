import { Injectable } from '@angular/core';
import { ICaja, IDetalle, IPagar } from '../models/caja';
import { IResponse } from 'src/app/global/response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  URLServicio: string = environment.URLTienda;

  constructor(private httpClient: HttpClient) { }

  getDetalle(idAtencion: number): Observable<IDetalle[]> {
    return this.httpClient.get<IDetalle[]>(`${this.URLServicio}pago/getDetalle/${idAtencion}`);
  }

  getAllActivos(date: string): Observable<ICaja[]> {
    const params = new HttpParams().set('fecha', date);
    return this.httpClient.get<ICaja[]>(`${this.URLServicio}pago/findByDate`, { params });
  }

  pagar(header: IPagar): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${this.URLServicio}pago/pagar`, header);
  }
}
