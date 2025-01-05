import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlmacenCentralComponent } from './pages/almacen-central/almacen-central.component';
import { DetalleAlmacenCentralComponent } from './pages/detalle-almacen-central/detalle-almacen-central.component';
import { AlmacenCentralRoutingModule } from './almacen-central-routing.module';


@NgModule({
  declarations: [
    AlmacenCentralComponent,
    DetalleAlmacenCentralComponent
  ],
  imports: [
    CommonModule,
    AlmacenCentralRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule
  ]
})
export class AlmacenCentralModule { }
