import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { CategoriaModule } from './categoria/categoria.module';
import { AlmacenCentralModule } from './almacen-central/almacen-central.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { MessageService } from 'primeng/api';
import { PacienteModule } from './paciente/paciente.module';
import { ExamenesModule } from './examenes/examenes.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DoctorModule } from './doctor/doctor.module';
import { AtencionModule } from './atencion/atencion.module';
import { ResultadoModule } from './resultado/resultado.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DashboardModule,
    RouterModule,
    CategoriaModule,
    AlmacenCentralModule,
    EmpleadoModule,
    PacienteModule,
    UsuarioModule,
    ExamenesModule,
    DoctorModule,
    AtencionModule,
    ResultadoModule
  ],
  exports: [
    CommonModule,
    DashboardModule,
    RouterModule,
    CategoriaModule,
    AlmacenCentralModule,
    EmpleadoModule,
    PacienteModule,
    UsuarioModule,
    ExamenesModule,
    DoctorModule,
    AtencionModule,
    ResultadoModule
  ],
  providers: [MessageService]
})
export class ModulesModule { }
