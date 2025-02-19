import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadoRoutingModule } from './resultado-routing.module';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetalleResultadosComponent } from './pages/detalle-resultados/detalle-resultados.component';
import { AgregarResultadosComponent } from './pages/agregar-resultados/agregar-resultados.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [ResultadosComponent, DetalleResultadosComponent, AgregarResultadosComponent],
  imports: [
    CommonModule,
    ResultadoRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    InputNumberModule,
    TooltipModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ResultadoModule { }
