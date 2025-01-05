import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArea } from '../models/area';
import { ICargo } from '../models/cargo';
import { IEmpleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  getAllActivos():Observable<IEmpleado[]> {
    return this.httpClient.get<IEmpleado[]>(`${this.URLServicio}empleado/getAllActive`);
  }

  insert(header: IEmpleado):Observable<IEmpleado> {
    return this.httpClient.post<IEmpleado>(`${this.URLServicio}empleado/insert/empleado`, header);
  }

  getFindById(id: number):Observable<IEmpleado[]> {
    return this.httpClient.get<IEmpleado[]>(`${this.URLServicio}empleado/findById/${id}`);
  }

  update(id: number, header: IEmpleado):Observable<IEmpleado> {
    return this.httpClient.put<IEmpleado>(`${this.URLServicio}empleado/update/${id}`, header);
  }

  setInactive(id: number):Observable<IEmpleado[]> {
    return this.httpClient.put<IEmpleado[]>(`${this.URLServicio}empleado/setInactive/${id}`, id);
  }

  /* OTROS */

  getArea():Observable<IArea[]> {
    return this.httpClient.get<IArea[]>(`${this.URLServicio}area/getAllActive`);
  }

  getCargo():Observable<ICargo[]> {
    return this.httpClient.get<ICargo[]>(`${this.URLServicio}cargo/getAllActive`);
  }
}
