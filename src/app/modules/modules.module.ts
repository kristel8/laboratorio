import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmpresaModule } from './empresa/empresa.module';
import { RouterModule } from '@angular/router';

import { CategoriaModule } from './categoria/categoria.module';
import { AlmacenCentralModule } from './almacen-central/almacen-central.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { MessageService } from 'primeng/api';
import { CajaSucursalModule } from './caja-sucursal/caja-sucursal.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DashboardModule,
    EmpresaModule,
    RouterModule,
    CategoriaModule,
    AlmacenCentralModule,
    EmpleadoModule,
    CajaSucursalModule
  ],
  exports: [
    CommonModule,
    DashboardModule,
    EmpresaModule,
    RouterModule,
    CategoriaModule,
    AlmacenCentralModule,
    EmpleadoModule,
    CajaSucursalModule
  ],
  providers: [MessageService]
})
export class ModulesModule { }
