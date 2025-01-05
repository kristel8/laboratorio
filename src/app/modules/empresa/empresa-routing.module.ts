import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { MantenimientoEmpresaComponent } from './pages/mantenimiento-empresa/mantenimiento-empresa.component';

const routes: Routes = [
  { path: '', component: EmpresasComponent },
  { path: 'mantenimiento-empresa', component: MantenimientoEmpresaComponent },
  { path: 'mantenimiento-empresa/:id', component: MantenimientoEmpresaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaRoutingModule {}
