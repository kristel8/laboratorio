import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamenComponent } from './pages/examen/examen.component';
import { AgregarExamenesComponent } from './pages/examen/agregar-examenes/agregar-examenes.component';
import { EditarExamenComponent } from './pages/examen/editar-examen/editar-examen.component';

const routes: Routes = [
  { path: '', component: ExamenComponent },
  { path: 'agregar-examenes', component: AgregarExamenesComponent},
  { path: 'editar-examen', component: EditarExamenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenesRoutingModule { }
