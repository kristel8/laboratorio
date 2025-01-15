import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [

  {
    path: '', component: LoginComponent,

  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'empresas',
        loadChildren: () => import('./modules/empresa/empresa.module').then(m => m.EmpresaModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'categorias',
        loadChildren: () => import('./modules/categoria/categoria.module').then(m => m.CategoriaModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'productos',
        loadChildren: () => import('./modules/producto/producto.module').then(m => m.ProductoModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'config-documento-impresos',
        loadChildren: () => import('./modules/config-documento-impreso/config-documento-impreso.module').then(m => m.ConfigDocumentoImpresoModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'importar-productos',
        loadChildren: () => import('./modules/importar-producto/importar-producto.module').then(m => m.ImportarProductoModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'almacen-central',
        loadChildren: () => import('./modules/almacen-central/almacen-central.module').then(m => m.AlmacenCentralModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'empleados',
        loadChildren: () => import('./modules/empleado/empleado.module').then(m => m.EmpleadoModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'clientes',
        loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'almacen-sucursal',
        loadChildren: () => import('./modules/almacen-sucursal/almacen-sucursal.module').then(m => m.AlmacenSucursalModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'paciente',
        loadChildren: () => import('./modules/paciente/paciente.module').then(m => m.PacienteModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'examenes',
        loadChildren: () => import('./modules/examenes/examenes.module').then(m => m.ExamenesModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'doctor',
        loadChildren: () => import('./modules/doctor/doctor/doctor.module').then(m => m.DoctorModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      },
      {
        path: 'caja',
        loadChildren: () => import('./modules/caja/caja.module').then(m => m.CajaModule),
        //canLoad: [AuthGuard],
        //canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
