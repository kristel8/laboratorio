import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmpresaModule } from './empresa/empresa.module';
import { RouterModule } from '@angular/router';
import { CategoriaModule } from './categoria/categoria.module';
import { AlmacenCentralRoutingModule } from './almacen-central/almacen-central-routing.module';
import { AlmacenCentralModule } from './almacen-central/almacen-central.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { MessageService } from 'primeng/api';
import { CajaSucursalModule } from './caja-sucursal/caja-sucursal.module';
import { PacienteModule } from './paciente/paciente.module';
import { ExamenesModule } from './examenes/examenes/examenes.module';
import { DoctorModule } from './doctor/doctor/doctor.module';
import { CajaModule } from './caja/caja.module';
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
    CajaSucursalModule,
    PacienteModule,
    ExamenesModule,
    DoctorModule,
    CajaModule
  ],
  exports: [
    CommonModule,
    DashboardModule,
    EmpresaModule,
    RouterModule,
    CategoriaModule,
    AlmacenCentralModule,
    EmpleadoModule,
    CajaSucursalModule,
    PacienteModule,
    ExamenesModule,
    DoctorModule,
    CajaModule
  ],
  providers: [MessageService]
})
export class ModulesModule { }
