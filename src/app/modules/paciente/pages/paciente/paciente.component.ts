import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IPaciente } from '../../models/paciente';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss'],
})
export class PacienteComponent implements OnInit {
  listaPacientes: IPaciente[] = [
    {
      idProducto: 1
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
      {  field: 'id',  header: 'ID',  visibility: true,  formatoFecha: ''   },
      {  field: 'apellidoPaterno',  header: 'Apellido Paterno',  visibility: true,  formatoFecha: '' },
      { field: 'apellidoMaterno', header: 'Apellido Materno', visibility: true, formatoFecha: '' },
      { field: 'nombres', header: 'Nombres', visibility: true, formatoFecha: '' },
      { field: 'dni', header: 'DNI', visibility: true, formatoFecha: '' },
      { field: 'fechaInscrito', header: 'Fecha Inscrito', visibility: true, formatoFecha: '' },
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
