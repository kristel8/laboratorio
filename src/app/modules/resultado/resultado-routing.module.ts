import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { DetalleResultadosComponent } from './pages/detalle-resultados/detalle-resultados.component';
import { AgregarResultadosComponent } from './pages/agregar-resultados/agregar-resultados.component';

const routes: Routes = [
  { path: '', component: ResultadosComponent},
  { path: 'detalle-resultado', component: DetalleResultadosComponent},
  { path: 'agregar-resultado', component: AgregarResultadosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadoRoutingModule { }
