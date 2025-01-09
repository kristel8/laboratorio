import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IExamen } from '../../../models/examenes';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss'],
})
export class ExamenComponent implements OnInit {
  listaExamenes: IExamen[] = [
    {
      idProducto: 1,
    },
  ];

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];

  isCargado: boolean = false;

  constructor() {}

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
      {  field: 'idExamen',  header: 'ID Examen',  visibility: true,  formatoFecha: ''   },
      {  field: 'nombre',  header: 'Nombre',  visibility: true,  formatoFecha: '' },
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'precio', header: 'Precio', visibility: true, formatoFecha: '' },
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
