import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigDocumentoImpresoRoutingModule } from './config-documento-impreso-routing.module';
import { ConfigDocumentoImpresoComponent } from './pages/config-documento-impreso/config-documento-impreso.component';
import { MantenimientoConfigDocumentoImpresoComponent } from './pages/mantenimiento-config-documento-impreso/mantenimiento-config-documento-impreso.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConfigDocumentoImpresoComponent,
    MantenimientoConfigDocumentoImpresoComponent
  ],
  imports: [
    CommonModule,
    ConfigDocumentoImpresoRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ConfigDocumentoImpresoModule { }
