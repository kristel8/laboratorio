import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { ICaja } from '../../models/caja';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {

listaCaja: ICaja[] = [
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
      {  field: 'idOrden',  header: 'Nro Orden',  visibility: true,  formatoFecha: ''   },
      {  field: 'apellidoNombre',  header: 'Apellidos y Nombres',  visibility: true,  formatoFecha: '' },
      { field: 'examen', header: 'Exámen', visibility: true, formatoFecha: '' },
      { field: 'costoTotal', header: 'Costo Total', visibility: true, formatoFecha: '' },
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
