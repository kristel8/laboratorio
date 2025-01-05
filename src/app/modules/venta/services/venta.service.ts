import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComprobanteVenta, IDetalleVenta, IListDetalleVenta, IProductoVenta, IVenta, IVentas } from '../models/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient ) { }

  getAllActive():Observable<IVentas[]> {
    return this.httpClient.get<IVentas[]>(`${this.URLServicio}venta/getAllActive`);
  }

  getListadoProductoVenta(id: number):Observable<IProductoVenta[]> {
    return this.httpClient.get<IProductoVenta[]>(`${this.URLServicio}venta/getListadoProductoVenta/${id}`);
  }

  insert(header: IVenta):Observable<IVenta> {
    return this.httpClient.post<IVenta>(`${this.URLServicio}venta/insert/venta`, header);
  }

  insertDetalleVenta(header: IDetalleVenta):Observable<IDetalleVenta> {
    return this.httpClient.post<IDetalleVenta>(`${this.URLServicio}detalleventa/save/detalleventa`, header);
  }

  getDetalleVenta(id: number):Observable<IListDetalleVenta> {
    return this.httpClient.get<IListDetalleVenta>(`${this.URLServicio}venta/getDetalleVenta/${id}`);
  }

  setVentaAnulada(id: number):Observable<IVenta[]> {
    return this.httpClient.put<IVenta[]>(`${this.URLServicio}venta/setVentaAnulada/${id}`, id);
  }

  getComprobanteVenta(id: number):Observable<IComprobanteVenta> {
    return this.httpClient.get<IComprobanteVenta>(`${this.URLServicio}venta/getComprobanteVenta/${id}`);
  }

}
