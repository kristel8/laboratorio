import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IPaciente } from '../../models/paciente';
import { Observable } from 'rxjs';
import { PacienteService } from '../../services/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss'],
})
export class PacienteComponent implements OnInit {
  listaElementos: IPaciente[] = [];

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];

  isCargado: boolean = false;

  constructor(
    private service: PacienteService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllActivosElementos();
  }

  getAllActivosElementos(): void {
    const obs = new Observable<boolean>((observer) => {
      this.service.getAllActivos().subscribe((resp) => {
        this.listaElementos = resp;
        observer.next(true);
      });
    });

    obs.subscribe((res) => {
      if (res) {
        this.isCargado = res;
        this.getColumnasTabla();
      }
    });
  }

  getColumnasTabla(): void {
    this.cols = [
      { field: 'apellidos', header: 'Apellidos', visibility: true, formatoFecha: '' },
      { field: 'nombre', header: 'Nombres', visibility: true, formatoFecha: '' },
      { field: 'tipoDocumento', header: 'Tipo Documento', visibility: true, formatoFecha: '' },
      { field: 'numDocumento', header: 'N° Documento', visibility: true, formatoFecha: '' },
      { field: 'genero', header: 'Género', visibility: true, formatoFecha: '' },
      { field: 'fechaIngreso', header: 'Fecha Ingreso', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }


  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.editarElemento(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  editarElemento(data: any) {
    const id = data.idPaciente;
    this.router.navigateByUrl(`paciente/mantenimiento-paciente/${id}`);
  }
}
