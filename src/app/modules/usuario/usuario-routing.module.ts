import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoUsuarioComponent } from './pages/mantenimiento-usuario/mantenimiento-usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'mantenimiento-usuario', component: MantenimientoUsuarioComponent },
  { path: 'mantenimiento-usuario/:id', component: MantenimientoUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
