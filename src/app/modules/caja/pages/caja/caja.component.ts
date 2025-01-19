import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { ICaja } from '../../models/caja';
import { IButton } from 'src/app/shared/components/table/models/table';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss'],
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

  acciones: IButton[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getItems();

    this.acciones = [
      {
        icono: 'pi pi-money-bill',
        clase: 'rounded',
        evento: 'pagar',
        estado: true,
        tooltip: 'Pagar'
      },
    ]
  }

  getItems(): void {
    //servicio
    this.isCargado = true;
    this.getColumnasTabla();
  }

  getColumnasTabla(): void {
    this.cols = [
      {
        field: 'idOrden',
        header: 'Nro Orden',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'apellidoNombre',
        header: 'Apellidos y Nombres',
        visibility: true,
        formatoFecha: '',
      },
      { field: 'fecha', header: 'Fecha', visibility: true, formatoFecha: '' },
      {
        field: 'costoTotal',
        header: 'Costo Total',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'opciones',
        header: 'Opciones',
        visibility: true,
        formatoFecha: '',
      },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'pagar':
        this.openModalPagar(data)
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  openModalPagar(data: any): void {
    //Aqui levanto el modal de Pagar
    console.log('Estoy ejecutando el modal')
  }
}
