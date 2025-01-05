import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProducto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  URLServicio: string = environment.URLTienda;

  constructor(private httpClient:HttpClient) { }


  getProductos():Observable<IProducto[]> {
    return this.httpClient.get<IProducto[]>(`${this.URLServicio}producto/getAll`);
  }

  getFindByIdProductos(id: number):Observable<IProducto[]> {
    return this.httpClient.get<IProducto[]>(`${this.URLServicio}producto/findById/${id}`);
  }

  getProductosActivos():Observable<IProducto[]> {
    return this.httpClient.get<IProducto[]>(`${this.URLServicio}producto/getAllActive`);
  }


  insertProductos(producto: IProducto):Observable<IProducto> {
    return this.httpClient.post<IProducto>(`${this.URLServicio}producto/insert/producto`, producto);
  }

  updateProductos(id: number, producto: IProducto):Observable<IProducto> {
    return this.httpClient.put<IProducto>(`${this.URLServicio}producto/update/${id}`, producto);
  }

  deleteProductos(id: number):Observable<IProducto[]> {
    return this.httpClient.put<IProducto[]>(`${this.URLServicio}producto/setInactive/${id}`, id);
  }
}
