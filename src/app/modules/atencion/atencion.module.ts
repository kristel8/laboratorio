import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionRoutingModule } from './atencion-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AtencionComponent } from './pages/atencion/atencion.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearAtencionComponent } from './pages/crear-atencion/crear-atencion.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AtencionComponent,
    CrearAtencionComponent
  ],
  imports: [
    CommonModule,
    AtencionRoutingModule,
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
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    DialogModule
  ],
})
export class AtencionModule { }
