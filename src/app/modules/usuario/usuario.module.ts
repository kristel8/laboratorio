import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MantenimientoUsuarioComponent } from './pages/mantenimiento-usuario/mantenimiento-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import {PickListModule} from 'primeng/picklist';
import {ToggleButtonModule} from 'primeng/togglebutton';


@NgModule({
  declarations: [
    UsuariosComponent,
    MantenimientoUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UsuarioRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    PickListModule,
    SelectButtonModule,
    ToggleButtonModule
  ],
  providers: [
    DatePipe
  ]
})
export class UsuarioModule { }
