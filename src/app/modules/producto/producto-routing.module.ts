import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoProductoComponent } from './pages/mantenimiento-producto/mantenimiento-producto.component';
import { ProductoComponent } from './pages/producto/producto.component';

const routes: Routes = [

  { path: '', component: ProductoComponent },
  { path: 'mantenimiento-producto', component: MantenimientoProductoComponent },
  { path: 'mantenimiento-producto/:id', component: MantenimientoProductoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
