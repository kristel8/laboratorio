import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  getAllActivos():Observable<ICliente[]> {
    return this.httpClient.get<ICliente[]>(`${this.URLServicio}cliente/getAllActive`);
  }

  insert(header: ICliente):Observable<ICliente> {
    return this.httpClient.post<ICliente>(`${this.URLServicio}cliente/insert/cliente`, header);
  }

  getFindById(id: number):Observable<ICliente[]> {
    return this.httpClient.get<ICliente[]>(`${this.URLServicio}cliente/findById/${id}`);
  }

  update(id: number, header: ICliente):Observable<ICliente> {
    return this.httpClient.put<ICliente>(`${this.URLServicio}cliente/update/${id}`, header);
  }

  setInactive(id: number):Observable<ICliente[]> {
    return this.httpClient.put<ICliente[]>(`${this.URLServicio}cliente/setInactive/${id}`, id);
  }
}
