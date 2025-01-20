import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MantenimientoPacienteComponent } from './pages/mantenimiento-paciente/mantenimiento-paciente.component';

const routes: Routes = [
  { path: '', component: PacienteComponent },
  { path: 'mantenimiento-paciente', component: MantenimientoPacienteComponent },
  { path: 'mantenimiento-paciente/:id', component: MantenimientoPacienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
