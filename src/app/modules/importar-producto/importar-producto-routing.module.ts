import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportarProductoComponent } from './pages/importar-producto/importar-producto.component';

const routes: Routes = [

  { path: '', component: ImportarProductoComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportarProductoRoutingModule { }
