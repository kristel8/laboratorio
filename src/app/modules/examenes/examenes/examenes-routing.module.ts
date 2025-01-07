import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamenComponent } from './pages/examenes/examen/examen.component';

const routes: Routes = [
  { path: '', component: ExamenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenesRoutingModule { }
