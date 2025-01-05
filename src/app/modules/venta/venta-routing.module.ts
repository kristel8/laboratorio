import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoVentaComponent } from './pages/mantenimiento-venta/mantenimiento-venta.component';
import { VentaComponent } from './pages/venta/venta.component';

const routes: Routes = [
  { path: '', component: VentaComponent },
  { path: 'mantenimiento-venta', component: MantenimientoVentaComponent },
  { path: 'mantenimiento-venta/:id', component: MantenimientoVentaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
