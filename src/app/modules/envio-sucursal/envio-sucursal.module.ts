import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvioSucursalRoutingModule } from './envio-sucursal-routing.module';
import { EnvioSucursalComponent } from './pages/envio-sucursal/envio-sucursal.component';
import { MantenimientoEnvioSucursalComponent } from './pages/mantenimiento-envio-sucursal/mantenimiento-envio-sucursal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    EnvioSucursalComponent,
    MantenimientoEnvioSucursalComponent
  ],
  imports: [
    CommonModule,
    EnvioSucursalRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    InputNumberModule,
    DialogModule,
    InputNumberModule
  ]
})
export class EnvioSucursalModule { }
