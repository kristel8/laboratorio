import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtencionComponent } from './pages/atencion/atencion.component';
import { CrearAtencionComponent } from './pages/crear-atencion/crear-atencion.component';

const routes: Routes = [
  { path: '', component: AtencionComponent},
  { path: 'crear-atencion', component: CrearAtencionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionRoutingModule { }
