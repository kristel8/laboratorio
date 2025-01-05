import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISubCategoria } from '../models/subcategoria';

@Injectable({
  providedIn: 'root'
})


export class SubCategoriaService {

  URLServicio: string = environment.URLTienda;

  constructor(private httpClient:HttpClient) { }

  getSubCategorias():Observable<ISubCategoria[]> {
    return this.httpClient.get<ISubCategoria[]>(`${this.URLServicio}subCategoria/getAll`);
  }

  getFindByIdSubCategorias(id: number):Observable<ISubCategoria[]> {
    return this.httpClient.get<ISubCategoria[]>(`${this.URLServicio}subCategoria/findById/${id}`);
  }

  getSubCategoriasActivos():Observable<ISubCategoria[]> {
    return this.httpClient.get<ISubCategoria[]>(`${this.URLServicio}subCategoria/getAllActive`);
  }


  insertSubCategorias(categoria: ISubCategoria):Observable<ISubCategoria> {
    return this.httpClient.post<ISubCategoria>(`${this.URLServicio}subCategoria/insert/subCategoria`, categoria);
  }

  updateSubCategorias(id: number, categoria: ISubCategoria):Observable<ISubCategoria> {
    return this.httpClient.put<ISubCategoria>(`${this.URLServicio}subCategoria/update/${id}`, categoria);
  }

  deleteSubCategorias(id: number):Observable<ISubCategoria[]> {
    return this.httpClient.put<ISubCategoria[]>(`${this.URLServicio}subCategoria/setInactive/${id}`, id);
  }


}
