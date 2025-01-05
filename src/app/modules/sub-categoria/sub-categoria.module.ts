import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoriaRoutingModule } from './sub-categoria-routing.module';

import { SubCategoriaComponent } from './pages/sub-categoria/sub-categoria.component';
import { MantenimientoSubCategoriaComponent } from './pages/mantenimiento-sub-categoria/mantenimiento-sub-categoria.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SubCategoriaComponent,
    MantenimientoSubCategoriaComponent
  ],
  imports: [
    CommonModule,
    SubCategoriaRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SubCategoriaModule { }
