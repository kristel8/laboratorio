import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoProveedorComponent } from './pages/mantenimiento-proveedor/mantenimiento-proveedor.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';

const routes: Routes = [
  { path: '', component: ProveedoresComponent },
  { path: 'mantenimiento-proveedor', component: MantenimientoProveedorComponent },
  { path: 'mantenimiento-proveedor/:id', component: MantenimientoProveedorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedorRoutingModule {}
