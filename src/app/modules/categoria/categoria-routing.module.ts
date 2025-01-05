import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { MantenimientoCategoriaComponent } from './pages/mantenimiento-categoria/mantenimiento-categoria.component';

const routes: Routes = [
  { path: '', component: CategoriaComponent },
  { path: 'mantenimiento-categoria', component: MantenimientoCategoriaComponent },
  { path: 'mantenimiento-categoria/:id', component: MantenimientoCategoriaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
