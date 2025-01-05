import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { MantenimientoClienteComponent } from './pages/mantenimiento-cliente/mantenimiento-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClientesComponent,
    MantenimientoClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
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
export class ClienteModule { }
