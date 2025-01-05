import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprasComponent } from './pages/compras/compras.component';
import { MantenimientoCompraComponent } from './pages/mantenimiento-compra/mantenimiento-compra.component';

const routes: Routes = [
  { path: '', component: ComprasComponent },
  { path: 'mantenimiento-compra', component: MantenimientoCompraComponent },
  { path: 'mantenimiento-compra/:id', component: MantenimientoCompraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraRoutingModule {}
