import { Component, OnInit } from '@angular/core';
import { IDoctor } from '../../models/doctor';
import { IColumnasTabla } from 'src/app/shared/models/columnas';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.scss']
})
export class DoctoresComponent implements OnInit {

    listaDoctores: IDoctor[] = [
      {
        idProducto: 1,
      },
    ];

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];

  isCargado: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    //servicio
    this.isCargado = true;
    this.getColumnasTabla();
  }

  getColumnasTabla(): void {
    this.cols = [
      {  field: 'idDoctor',  header: 'ID Doctor',  visibility: true,  formatoFecha: ''   },
      {  field: 'apellidoNombre',  header: 'Apellidos y Nombres',  visibility: true,  formatoFecha: '' },
      { field: 'usuariosReferidos', header: 'Usuarios referidos', visibility: true, formatoFecha: '' },
      { field: 'fecha', header: 'Fecha', visibility: true, formatoFecha: '' },
      { field: 'opciones', header: 'Opciones', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        //this.editarProducto(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

}
