import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { MantenimientoClienteComponent } from './pages/mantenimiento-cliente/mantenimiento-cliente.component';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'mantenimiento-cliente', component: MantenimientoClienteComponent },
  { path: 'mantenimiento-cliente/:id', component: MantenimientoClienteComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
