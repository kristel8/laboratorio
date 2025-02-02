import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MantenimientoPacienteComponent } from './pages/mantenimiento-paciente/mantenimiento-paciente.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    PacienteComponent,
    MantenimientoPacienteComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    InputTextareaModule
  ]
})
export class PacienteModule { }
