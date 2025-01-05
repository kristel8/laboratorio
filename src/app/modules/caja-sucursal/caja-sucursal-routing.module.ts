import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientoCajaComponent } from './pages/movimiento-caja/movimiento-caja.component';
import { ResumenCajaComponent } from './pages/resumen-caja/resumen-caja.component';

const routes: Routes = [
  { path: 'resumen-caja', component: ResumenCajaComponent },
  { path: 'movimiento-caja', component: MovimientoCajaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaSucursalRoutingModule { }
