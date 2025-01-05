import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCategoriaComponent } from './pages/sub-categoria/sub-categoria.component';
import { MantenimientoSubCategoriaComponent} from './pages/mantenimiento-sub-categoria/mantenimiento-sub-categoria.component';

const routes: Routes = [

  { path: '', component: SubCategoriaComponent },
  { path: 'mantenimiento-subcategoria', component: MantenimientoSubCategoriaComponent },
  { path: 'mantenimiento-subcategoria/:id', component: MantenimientoSubCategoriaComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoriaRoutingModule { }
