import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  $isCargando = new Subject<boolean>();

  constructor() { }


  mostrarLoading():void{
    this.$isCargando.next(true);
  }

  ocultarLoading():void{
    this.$isCargando.next(false);
  }

}
