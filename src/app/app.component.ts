import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Constantes } from './global/constantes';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tienda';

  constructor(private primeNGConfig: PrimeNGConfig) {
    this.primeNGConfig.setTranslation(Constantes.ES_CALENDARIO);
  }

}
