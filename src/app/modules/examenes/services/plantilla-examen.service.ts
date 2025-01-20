import { Injectable } from '@angular/core';
import { IExamen } from '../models/examenes';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IResponse } from 'src/app/global/response';
import { IPlantillaExamen, IPlantillaExamenResponse } from '../models/plantilla-examen';

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
    return this.httpClient.get<IPlantillaExamen[]>(`${this.URLServicio}analisis/findById/${id}`)
  }

  update(id: number, header: IPlantillaExamen):Observable<IPlantillaExamenResponse> {
    return this.httpClient.put<IPlantillaExamenResponse>(`${this.URLServicio}plantillaanalisis/update/${id}`, header);
  }

}
