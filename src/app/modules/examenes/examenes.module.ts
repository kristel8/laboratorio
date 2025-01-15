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
import { AgregarExamenesComponent } from './pages/examen/agregar-examenes/agregar-examenes.component';
import { EditarExamenComponent } from './pages/examen/editar-examen/editar-examen.component';

@NgModule({
  declarations: [
    ExamenComponent,
    AgregarExamenesComponent,
    EditarExamenComponent
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
    DropdownModule,
    InputNumberModule,
  ],
})
export class ExamenesModule {}
