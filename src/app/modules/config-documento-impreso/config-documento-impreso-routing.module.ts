import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigDocumentoImpresoComponent } from './pages/config-documento-impreso/config-documento-impreso.component';
import { MantenimientoConfigDocumentoImpresoComponent } from './pages/mantenimiento-config-documento-impreso/mantenimiento-config-documento-impreso.component';

const routes: Routes = [

  { path: '', component: ConfigDocumentoImpresoComponent },
  { path: 'mantenimiento-config-documento-impreso', component: MantenimientoConfigDocumentoImpresoComponent },
  { path: 'mantenimiento-config-documento-impreso/:id', component: MantenimientoConfigDocumentoImpresoComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigDocumentoImpresoRoutingModule { }
