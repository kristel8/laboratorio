import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IConfigDocumentoImpreso } from '../models/configDocumentoImpreso';

@Injectable({
  providedIn: 'root'
})
export class ConfigDocumentoImpresoService {

  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  getConfigDocumentoImpresos():Observable<IConfigDocumentoImpreso[]> {
    return this.httpClient.get<IConfigDocumentoImpreso[]>(`${this.URLServicio}configDocumentoImpreso/getAll`);
  }

  getFindByIdConfigDocumentoImpresos(id: number):Observable<IConfigDocumentoImpreso> {
    return this.httpClient.get<IConfigDocumentoImpreso>(`${this.URLServicio}configDocumentoImpreso/findById/${id}`);
  }

  getConfigDocumentoImpresosActivos():Observable<IConfigDocumentoImpreso[]> {
    return this.httpClient.get<IConfigDocumentoImpreso[]>(`${this.URLServicio}configDocumentoImpreso/getAllActive`);
  }


  insertConfigDocumentoImpresos(configDocumentoImpreso: IConfigDocumentoImpreso):Observable<IConfigDocumentoImpreso> {
    return this.httpClient.post<IConfigDocumentoImpreso>(`${this.URLServicio}configDocumentoImpreso/insert/configDocumentoImpreso`, configDocumentoImpreso);
  }

  updateConfigDocumentoImpresos(id: number, configDocumentoImpreso: IConfigDocumentoImpreso):Observable<IConfigDocumentoImpreso> {
    return this.httpClient.put<IConfigDocumentoImpreso>(`${this.URLServicio}configDocumentoImpreso/update/${id}`, configDocumentoImpreso);
  }

  deleteConfigDocumentoImpresos(id: number):Observable<IConfigDocumentoImpreso[]> {
    return this.httpClient.put<IConfigDocumentoImpreso[]>(`${this.URLServicio}configDocumentoImpreso/setInactive/${id}`, id);
  }
}
