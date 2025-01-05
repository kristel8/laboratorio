import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ICategoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  getCategorias():Observable<ICategoria[]> {
    return this.httpClient.get<ICategoria[]>(`${this.URLServicio}categoria/getAll`);
  }

  getFindByIdCategorias(id: number):Observable<ICategoria[]> {
    return this.httpClient.get<ICategoria[]>(`${this.URLServicio}categoria/findById/${id}`);
  }

  getCategoriasActivos():Observable<ICategoria[]> {
    return this.httpClient.get<ICategoria[]>(`${this.URLServicio}categoria/getAllActive`);
  }


  insertCategorias(categoria: ICategoria):Observable<ICategoria> {
    return this.httpClient.post<ICategoria>(`${this.URLServicio}categoria/insert/categoria`, categoria);
  }

  updateCategorias(id: number, categoria: ICategoria):Observable<ICategoria> {
    return this.httpClient.put<ICategoria>(`${this.URLServicio}categoria/update/${id}`, categoria);
  }

  deleteCategorias(id: number):Observable<ICategoria[]> {
    return this.httpClient.put<ICategoria[]>(`${this.URLServicio}categoria/setInactive/${id}`, id);
  }
}