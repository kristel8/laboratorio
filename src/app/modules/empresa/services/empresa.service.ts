import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpresa } from '../models/empresa';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  getEmpresas():Observable<IEmpresa[]> {
    return this.httpClient.get<IEmpresa[]>(`${this.URLServicio}empresa/getAll`);
  }

  getFindByIdEmpresas(id: number):Observable<IEmpresa[]> {
    return this.httpClient.get<IEmpresa[]>(`${this.URLServicio}empresa/findById/${id}`);
  }

  getEmpresasActivos():Observable<IEmpresa[]> {
    return this.httpClient.get<IEmpresa[]>(`${this.URLServicio}empresa/getAllActive`);
  }


  insertEmpresas(empresa: IEmpresa):Observable<IEmpresa> {
    return this.httpClient.post<IEmpresa>(`${this.URLServicio}empresa/insert/empresa`, empresa);
  }

  updateEmpresas(id: number, empresa: IEmpresa):Observable<IEmpresa> {
    return this.httpClient.put<IEmpresa>(`${this.URLServicio}empresa/update/${id}`, empresa);
  }

  deleteEmpresas(id: number):Observable<IEmpresa[]> {
    return this.httpClient.put<IEmpresa[]>(`${this.URLServicio}empresa/setInactive/${id}`, id);
  }
}
