import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICompra, IDetalleCompra, IListaCompra, IProducto } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  getProductosActivos():Observable<IProducto[]> {
    return this.httpClient.get<IProducto[]>(`${this.URLServicio}producto/getAllActive`);
  }

  getCompraActivos():Observable<IListaCompra[]> {
    return this.httpClient.get<IListaCompra[]>(`${this.URLServicio}compra/getAllActive`);
  }

  insertCompra(compra: ICompra):Observable<ICompra> {
    return this.httpClient.post<ICompra>(`${this.URLServicio}compra/insert/compra`, compra);
  }

  insertDetalleCompra(detalleCompra: IDetalleCompra):Observable<IDetalleCompra> {
    return this.httpClient.post<IDetalleCompra>(`${this.URLServicio}detalleCompra/save`, detalleCompra);
  }

  deleteCompra(id: number):Observable<ICompra[]> {
    return this.httpClient.put<ICompra[]>(`${this.URLServicio}compra/setInactive/${id}`, id);
  }

  updateCompra(id: number, compra: ICompra):Observable<ICompra> {
    return this.httpClient.put<ICompra>(`${this.URLServicio}compra/update/${id}`, compra);
  }

  getFindByIdCompra(id: number):Observable<ICompra[]> {
    return this.httpClient.get<ICompra[]>(`${this.URLServicio}compra/findById/${id}`);
  }

  setCanceledCompra(id: number):Observable<ICompra> {
    return this.httpClient.put<ICompra>(`${this.URLServicio}compra/setCanceled/${id}`, id);
  }

  setReceivedCompra(id: number):Observable<ICompra> {
    return this.httpClient.put<ICompra>(`${this.URLServicio}compra/setReceived/${id}`, id);
  }

  getForIdentified(id: number):Observable<IDetalleCompra[]> {
    return this.httpClient.get<IDetalleCompra[]>(`${this.URLServicio}detalleCompra/getForIdentified/${id}`);
  }
}
