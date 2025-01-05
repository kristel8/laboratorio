import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoSucursalComponent } from './pages/mantenimiento-sucursal/mantenimiento-sucursal.component';
import { SucursalComponent } from './pages/sucursal/sucursal.component';

const routes: Routes = [
  { path: '', component: SucursalComponent },
  { path: 'mantenimiento-sucursal', component: MantenimientoSucursalComponent },
  { path: 'mantenimiento-sucursal/:id', component: MantenimientoSucursalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SucursalRoutingModule {}
