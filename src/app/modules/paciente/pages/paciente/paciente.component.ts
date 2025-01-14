import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IPaciente } from '../../models/paciente';
import { IButton } from 'src/app/shared/components/table/models/table';
import { Router } from '@angular/router';

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
      {  field: 'id',  header: 'ID',  visibility: true,  formatoFecha: ''   },
      {  field: 'apellidoPaterno',  header: 'Apellido Paterno',  visibility: true,  formatoFecha: '' },
      { field: 'apellidoMaterno', header: 'Apellido Materno', visibility: true, formatoFecha: '' },
      { field: 'nombres', header: 'Nombres', visibility: true, formatoFecha: '' },
      { field: 'dni', header: 'DNI', visibility: true, formatoFecha: '' },
      { field: 'fechaInscrito', header: 'Fecha Inscrito', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  
  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.navigateEditarPaciente(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  navigateEditarPaciente(data: any):  void {
    console.log('navegando a editar')
    this.router.navigateByUrl(`paciente/editar-paciente`);
     
  }
}
