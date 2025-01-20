import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IResultado } from '../../models/resultado';
import { IButton } from 'src/app/shared/components/table/models/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  listaResultados: IResultado[] = [
    {
      idResultado: 1,
    },
  ];

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  acciones: IButton[] = [];
  isCargado: boolean = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getItems();

    this.acciones = [
      {
        icono: 'pi pi-eye',
        clase: 'rounded',
        evento: 'mostrar',
        estado: true,
        tooltip: 'Ver examenes'
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
      { field: 'id', header: 'ID', visibility: true, formatoFecha: '' },
      {
        field: 'nroOrden',
        header: 'Nro Orden',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'apellidosyNombres',
        header: 'Apellidos y Nombres',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'usuario',
        header: 'Usuario',
        visibility: true,
        formatoFecha: '',
      },
      { field: 'fecha', header: 'Fecha', visibility: true, formatoFecha: '' },
  
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'mostrar':
        this.navigateVerExamenes(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

 navigateVerExamenes(data: any): void {
  console.log('NAVEGANDO A VER EXAMENES');
  this.router.navigateByUrl(`resultado/detalle-resultado`);
 }
}
