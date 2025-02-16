import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenesRoutingModule } from './examenes-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ExamenComponent } from './pages/examen/examen.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MantenimientoExamenComponent } from './pages/mantenimiento-examen/mantenimiento-examen.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    ExamenComponent,
    MantenimientoExamenComponent
  ],
  imports: [
    CommonModule,
    ExamenesRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
    DialogModule,
    CheckboxModule
  ],
})
export class ExamenesModule { }
