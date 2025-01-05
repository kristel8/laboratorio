import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaSucursalRoutingModule } from './caja-sucursal-routing.module';
import { ResumenCajaComponent } from './pages/resumen-caja/resumen-caja.component';
import { MovimientoCajaComponent } from './pages/movimiento-caja/movimiento-caja.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    ResumenCajaComponent,
    MovimientoCajaComponent,
  ],
  imports: [
    CommonModule,
    CajaSucursalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    SelectButtonModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    SharedModule
  ]
})
export class CajaSucursalModule { }
