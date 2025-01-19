import { Component, OnInit } from '@angular/core';
import { IDoctor } from '../../models/doctor';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { DoctorService } from '../../services/doctor.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.scss']
})
export class DoctoresComponent implements OnInit {

  listaElementos: IDoctor[] = [];

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];

  isCargado: boolean = false;


  constructor(
    private service: DoctorService,
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
      { field: 'idDoctor', header: 'ID Doctor', visibility: true, formatoFecha: '' },
      { field: 'apellidoNombre', header: 'Apellidos y Nombres', visibility: true, formatoFecha: '' },
      { field: 'usuariosReferidos', header: 'Usuarios referidos', visibility: true, formatoFecha: '' },
      { field: 'fecha', header: 'Fecha', visibility: true, formatoFecha: '' },

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
