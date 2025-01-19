import { Injectable } from '@angular/core';
import { IDoctor } from '../models/doctor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/global/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  getAllActivos():Observable<IDoctor[]> {
    return this.httpClient.get<IDoctor[]>(`${this.URLServicio}doctor/getAllActive`)
  }

  insert(header: IDoctor):Observable<IDoctor> {
    return this.httpClient.post<IDoctor>(`${this.URLServicio}doctor/insert/doctor`, header);
  }

  getFindById(id: number):Observable<IDoctor> {
    return this.httpClient.get<IDoctor>(`${this.URLServicio}doctor/findById/${id}`)
  }

  update(id: number, header: IDoctor):Observable<IResponse> {
    return this.httpClient.put<IResponse>(`${this.URLServicio}doctor/update/${id}`, header);
  }

  setInactive(id: number):Observable<IResponse> {
    return this.httpClient.put<IResponse>(`${this.URLServicio}doctor/setInactive/${id}`, id);
  }
}
