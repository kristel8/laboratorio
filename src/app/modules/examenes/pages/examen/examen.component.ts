import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IExamen } from '../../models/examenes';
import { IButton } from 'src/app/shared/components/table/models/table';
import { Router } from '@angular/router';

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
  acciones: IButton [] = [];
  isCargado: boolean = false;

  constructor(
    private router: Router
  ) {}

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
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  
  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.navigateEditarExamen(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  navigateEditarExamen(data: any): void {
    console.log('navegar a editar examen');
    this.router.navigateByUrl(`examenes/editar-examen`);
  }
}
