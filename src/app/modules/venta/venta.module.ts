import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { MantenimientoVentaComponent } from './pages/mantenimiento-venta/mantenimiento-venta.component';
import { VentaComponent } from './pages/venta/venta.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { MensajesToastService } from 'src/app/shared/services/mensajes-toast.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MantenimientoVentaComponent,
    VentaComponent
  ],
  imports: [
    CommonModule,
    VentaRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule,
    HttpClientModule,
    DialogModule,
    DropdownModule,
    SelectButtonModule,
    CalendarModule,
    RouterModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [MessageService],
})
export class VentaModule { }
