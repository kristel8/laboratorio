import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IDetalleResultado } from '../../models/resultado';
import { IButton } from 'src/app/shared/components/table/models/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-resultados',
  templateUrl: './detalle-resultados.component.html',
  styleUrls: ['./detalle-resultados.component.scss'],
})
export class DetalleResultadosComponent implements OnInit {
  listaDetalleResultado: IDetalleResultado[] = [
    {
      idDetalleResultado: 1,
    },
  ];

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  acciones: IButton [] = [];
  isCargado: boolean = false;

  

  constructor (private fb: FormBuilder, private router: Router) { }

    detalleResultadoForm = this.fb.group({
    nroOrden: [{ value: null, disabled: true }],
    apellidosyNombres: [{ value: null, disabled: true }],
    fecha: [{ value: null, disabled: true }],
  });

  ngOnInit(): void {
    this.getItems();

    this.acciones = [
      {
        icono: 'pi pi-plus',
        clase: 'rounded',
        evento: 'agregar',
        estado: true,
        tooltip: 'Agregar resultado'
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
      { field: 'examen', header: 'Examen', visibility: true, formatoFecha: '' },
      { field: 'fecha', header: 'Fecha', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'agregar':
        this.navigateAgregarResultado(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }
  navigateAgregarResultado(data: any): void {
    console.log('Agregando resultados');
    this.router.navigateByUrl(`resultado/agregar-resultado`);
  }
}
