import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { MantenimientoEmpleadoComponent } from './pages/mantenimiento-empleado/mantenimiento-empleado.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    EmpleadosComponent,
    MantenimientoEmpleadoComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    RouterModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    SelectButtonModule,
    InputNumberModule
  ],
  providers: [
    DatePipe
  ]
})
export class EmpleadoModule { }
