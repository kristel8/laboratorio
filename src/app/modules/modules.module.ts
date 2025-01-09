import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmpresaModule } from './empresa/empresa.module';
import { RouterModule } from '@angular/router';
import { CategoriaModule } from './categoria/categoria.module';
import { AlmacenCentralModule } from './almacen-central/almacen-central.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { MessageService } from 'primeng/api';
import { PacienteModule } from './paciente/paciente.module';
import { ExamenesModule } from './examenes/examenes.module';
import { UsuarioModule } from './usuario/usuario.module';
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
    PacienteModule,
    UsuarioModule,
    ExamenesModule
  ],
  exports: [
    CommonModule,
    DashboardModule,
    EmpresaModule,
    RouterModule,
    CategoriaModule,
    AlmacenCentralModule,
    EmpleadoModule,
    PacienteModule,
    UsuarioModule,
    ExamenesModule
  ],
  providers: [MessageService]
})
export class ModulesModule { }
