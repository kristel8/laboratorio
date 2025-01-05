import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tienda';
  isLoading = this.loadingService.$isCargando;

  constructor( public loadingService: LoadingService) {}

}
