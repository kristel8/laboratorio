import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { EditarPacienteComponent } from './pages/editar-paciente/editar-paciente.component';
import { CrearPacienteComponent } from './pages/crear-paciente/crear-paciente.component';

const routes: Routes = [
   { path: '', component: PacienteComponent},
   { path: 'editar-paciente', component: EditarPacienteComponent},
   { path: 'crear-paciente', component: CrearPacienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
