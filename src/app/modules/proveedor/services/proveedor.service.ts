import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  getProveedor():Observable<IProveedor[]> {
    return this.httpClient.get<IProveedor[]>(`${this.URLServicio}proveedor/getAll`);
  }

  getFindByIdProveedor(id: number):Observable<IProveedor[]> {
    return this.httpClient.get<IProveedor[]>(`${this.URLServicio}proveedor/findById/${id}`);
  }

  getProveedorActivos():Observable<IProveedor[]> {
    return this.httpClient.get<IProveedor[]>(`${this.URLServicio}proveedor/getAllActive`);
  }


  insertProveedor(proveedor: IProveedor):Observable<IProveedor> {
    return this.httpClient.post<IProveedor>(`${this.URLServicio}proveedor/insert/proveedor`, proveedor);
  }

  updateProveedor(id: number, proveedor: IProveedor):Observable<IProveedor> {
    return this.httpClient.put<IProveedor>(`${this.URLServicio}proveedor/update/${id}`, proveedor);
  }

  deleteProveedor(id: number):Observable<IProveedor[]> {
    return this.httpClient.put<IProveedor[]>(`${this.URLServicio}proveedor/setInactive/${id}`, id);
  }
}
