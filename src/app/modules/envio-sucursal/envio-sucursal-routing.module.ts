import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvioSucursalComponent } from './pages/envio-sucursal/envio-sucursal.component';
import { MantenimientoEnvioSucursalComponent } from './pages/mantenimiento-envio-sucursal/mantenimiento-envio-sucursal.component';

const routes: Routes = [

  { path: '', component: EnvioSucursalComponent },
  { path: 'mantenimiento-envio-sucursal', component: MantenimientoEnvioSucursalComponent },
  { path: 'mantenimiento-envio-sucursal/:id', component: MantenimientoEnvioSucursalComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvioSucursalRoutingModule { }
