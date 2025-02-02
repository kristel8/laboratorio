import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { CajaComponent } from './pages/caja/caja.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [CajaComponent],
  imports: [
    CommonModule,
    CajaRoutingModule,
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
    DialogModule,
    SelectButtonModule,
  ],
})
export class CajaModule {}
