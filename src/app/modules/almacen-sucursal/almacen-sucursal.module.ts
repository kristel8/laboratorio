import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenSucursalComponent } from './pages/almacen-sucursal/almacen-sucursal.component';
import { AlmacenSucursalRoutingModule } from './almacen-sucursal-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetalleAlmacenSucursalComponent } from './pages/detalle-almacen-sucursal/detalle-almacen-sucursal.component';



@NgModule({
  declarations: [
    AlmacenSucursalComponent,
    DetalleAlmacenSucursalComponent
  ],
  imports: [
    CommonModule,
    AlmacenSucursalRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule
  ]
})
export class AlmacenSucursalModule { }
