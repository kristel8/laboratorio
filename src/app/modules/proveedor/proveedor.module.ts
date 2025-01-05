import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { MantenimientoProveedorComponent } from './pages/mantenimiento-proveedor/mantenimiento-proveedor.component';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import {InputMaskModule} from 'primeng/inputmask';
import { NgxMaskModule } from 'ngx-mask';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProveedoresComponent,
    MantenimientoProveedorComponent
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule,
    HttpClientModule,
    DropdownModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ProveedorModule { }
