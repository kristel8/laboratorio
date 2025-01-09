import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoSucursalComponent } from './pages/mantenimiento-sucursal/mantenimiento-sucursal.component';
import { SucursalComponent } from './pages/sucursal/sucursal.component';
import { SucursalRoutingModule } from './sucursal-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    MantenimientoSucursalComponent,
    SucursalComponent
  ],
  imports: [
    CommonModule,
    SucursalRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    HttpClientModule
  ]
})
export class SucursalModule { }
