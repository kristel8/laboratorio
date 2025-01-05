import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportarProductoRoutingModule } from './importar-producto-routing.module';
import { ImportarProductoComponent } from './pages/importar-producto/importar-producto.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import {FileUploadModule} from 'primeng/fileupload';



@NgModule({
  declarations: [
    ImportarProductoComponent
  ],
  imports: [
    CommonModule,
    ImportarProductoRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,   
    HttpClientModule,
    FileUploadModule

    
  
  ]
})
export class ImportarProductoModule { }
