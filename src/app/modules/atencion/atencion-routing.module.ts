import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtencionComponent } from './pages/atencion/atencion.component';

const routes: Routes = [
  { path: '', component: AtencionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionRoutingModule { }
