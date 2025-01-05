import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenCentralComponent } from './pages/almacen-central/almacen-central.component';
import { DetalleAlmacenCentralComponent } from './pages/detalle-almacen-central/detalle-almacen-central.component';

const routes: Routes = [
  { path: '', component: AlmacenCentralComponent },
  { path: 'detalle-almacen-central/:id', component: DetalleAlmacenCentralComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenCentralRoutingModule { }
