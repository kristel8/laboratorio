import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmpresaModule } from './empresa/empresa.module';
import { RouterModule } from '@angular/router';

import { CategoriaModule } from './categoria/categoria.module';
import { SubCategoriaModule } from './sub-categoria/sub-categoria.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { CompraModule } from './compra/compra.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { VentaModule } from './venta/venta.module';
import { AlmacenCentralRoutingModule } from './almacen-central/almacen-central-routing.module';
import { AlmacenCentralModule } from './almacen-central/almacen-central.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RecepcionModule } from './recepcion/recepcion.module';
import { MessageService } from 'primeng/api';
import { CajaSucursalModule } from './caja-sucursal/caja-sucursal.module';
import { PacienteModule } from './paciente/paciente.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DashboardModule,
    EmpresaModule,
    ProveedorModule,
    CompraModule,
    RouterModule,
    CategoriaModule,
    SubCategoriaModule,
    SucursalModule,
    VentaModule,
    AlmacenCentralModule,
    EmpleadoModule,
    UsuarioModule,
    RecepcionModule,
    CajaSucursalModule,
    PacienteModule
  ],
  exports: [
    CommonModule,
    DashboardModule,
    EmpresaModule,
    ProveedorModule,
    CompraModule,
    RouterModule,
    CategoriaModule,
    SubCategoriaModule,
    SucursalModule,
    VentaModule,
    AlmacenCentralModule,
    EmpleadoModule,
    UsuarioModule,
    RecepcionModule,
    CajaSucursalModule,
    PacienteModule
  ],
  providers: [MessageService]
})
export class ModulesModule { }
