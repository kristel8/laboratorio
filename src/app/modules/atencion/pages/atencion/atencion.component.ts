import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IAtencion } from '../../models/atencion';


@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.scss'],
})
export class AtencionComponent implements OnInit {
  listaAtencion: IAtencion[] = [
    {
      idResultado: 1,
    }
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
      {  field: 'nrOrden',  header: 'Nr Orden',  visibility: true,  formatoFecha: ''   },
      { field: 'apellidosyNombres', header: 'Apellidos y Nombres', visibility: true, formatoFecha: '' },
      { field: 'dni', header: 'DNI', visibility: true, formatoFecha: '' },
      { field: 'fechaCreacion', header: 'Fecha Creacion', visibility: true, formatoFecha: '' },
      
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
