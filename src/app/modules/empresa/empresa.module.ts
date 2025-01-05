import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MantenimientoEmpresaComponent } from './pages/mantenimiento-empresa/mantenimiento-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmpresasComponent,
    MantenimientoEmpresaComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
})
export class EmpresaModule { }
