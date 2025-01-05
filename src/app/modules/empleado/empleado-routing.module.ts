import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { MantenimientoEmpleadoComponent } from './pages/mantenimiento-empleado/mantenimiento-empleado.component';

const routes: Routes = [
  { path: '', component: EmpleadosComponent },
  { path: 'mantenimiento-empleado', component: MantenimientoEmpleadoComponent },
  { path: 'mantenimiento-empleado/:id', component: MantenimientoEmpleadoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
