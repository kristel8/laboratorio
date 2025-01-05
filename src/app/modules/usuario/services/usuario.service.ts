import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDetallePermiso, IMenu, IUsuario, IUsuarioSave } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  getAll():Observable<IUsuario[]> {
    return this.httpClient.get<IUsuario[]>(`${this.URLServicio}usuario/getAll`);
  }

  insert(header: IUsuarioSave):Observable<IUsuarioSave> {
    return this.httpClient.post<IUsuarioSave>(`${this.URLServicio}usuario/insert/usuario`, header);
  }

  getFindById(id: number):Observable<IUsuario[]> {
    return this.httpClient.get<IUsuario[]>(`${this.URLServicio}usuario/findById/${id}`);
  }

  update(id: number, header: IUsuarioSave):Observable<IUsuarioSave> {
    return this.httpClient.put<IUsuarioSave>(`${this.URLServicio}usuario/update/${id}`, header);
  }

  setInactive(id: number):Observable<any> {
    return this.httpClient.put<any>(`${this.URLServicio}usuario/setInactive/${id}`, id);
  }

  getMenuAllActive():Observable<IMenu[]> {
    return this.httpClient.get<IMenu[]>(`${this.URLServicio}menu/getAllActive`);
  }

  insertDetallePermiso(header: IDetallePermiso[]):Observable<IDetallePermiso[]> {
    return this.httpClient.post<IDetallePermiso[]>(`${this.URLServicio}detallepermisos/insert/detallepermisos`, header);
  }

  getFindByIdDetallePermiso(id: number):Observable<IDetallePermiso[]> {
    return this.httpClient.get<IDetallePermiso[]>(`${this.URLServicio}detallepermisos/findById/${id}`);
  }

  updateDetallePermiso(id: number, header: IDetallePermiso[]):Observable<IDetallePermiso> {
    return this.httpClient.put<IDetallePermiso>(`${this.URLServicio}detallepermisos/update/${id}`, header);
  }

}

