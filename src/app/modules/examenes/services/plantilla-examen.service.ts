import { Injectable } from '@angular/core';
import { IExamen } from '../models/examenes';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IResponse } from 'src/app/global/response';
import { IPlantillaExamen, IPlantillaExamenResponse } from '../models/plantilla-examen';
import { map } from 'rxjs/operators';
import { IResultadoPlantillaUroCultivo } from '../../resultado/models/resultado';

@Injectable({
  providedIn: 'root'
})
export class PlantillaExamenService {
  URLServicio: string = environment.URLTienda;

  constructor( private httpClient:HttpClient) { }

  insert(header: IPlantillaExamen[]):Observable<IPlantillaExamenResponse> {
    return this.httpClient.post<IPlantillaExamenResponse>(`${this.URLServicio}plantillaanalisis/insert/plantillaanalisis`, header);
  }

  getFindById(id: number):Observable<IPlantillaExamen[]> {
    return this.httpClient.get<IPlantillaExamen[]>(`${this.URLServicio}plantillaanalisis/findByIdAnalisis/${id}`)
  }

  getFindByIdAndUrocultivo(id: number, header: IResultadoPlantillaUroCultivo):Observable<IPlantillaExamen[]> {
    const params = new HttpParams()
    .set('idAnalisis ', header.idAnalisis)
    .set('tipoUroCultivo', header.tipoUroCultivo.toString());

    return this.httpClient.get<IPlantillaExamen[]>(`${this.URLServicio}plantillaanalisis/findByIdAnalisisAndTipoUroCultivo/${id}`, { params })
  }

  update(id: number, header: IPlantillaExamen[]):Observable<IPlantillaExamenResponse> {
    return this.httpClient.put<IPlantillaExamenResponse>(`${this.URLServicio}plantillaanalisis/update/${id}`, header);
  }



}
