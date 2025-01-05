import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenSucursalComponent } from './pages/almacen-sucursal/almacen-sucursal.component';
import { DetalleAlmacenSucursalComponent } from './pages/detalle-almacen-sucursal/detalle-almacen-sucursal.component';

const routes: Routes = [
  { path: '', component: AlmacenSucursalComponent },
  { path: 'detalle-almacen-sucursal/:id', component: DetalleAlmacenSucursalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenSucursalRoutingModule { }
