import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ComprasComponent } from './pages/compras/compras.component';
import { RouterModule } from '@angular/router';
import { CompraRoutingModule } from './compra-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import { MantenimientoCompraComponent } from './pages/mantenimiento-compra/mantenimiento-compra.component';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    ComprasComponent,
    MantenimientoCompraComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CompraRoutingModule,
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
    SelectButtonModule
  ],
  providers: [
    DatePipe
  ]
})
export class CompraModule { }
