import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamenComponent } from './pages/examen/examen.component';
import { MantenimientoExamenComponent } from './pages/mantenimiento-examen/mantenimiento-examen.component';

const routes: Routes = [
  { path: '', component: ExamenComponent },
  { path: 'mantenimiento-examen', component: MantenimientoExamenComponent },
  { path: 'mantenimiento-examen/:id', component: MantenimientoExamenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenesRoutingModule { }
