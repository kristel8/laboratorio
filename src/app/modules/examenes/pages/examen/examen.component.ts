import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IExamen } from '../../models/examenes';
import { Router } from '@angular/router';
import { ExamenService } from '../../services/examen.service';
import { Observable } from 'rxjs';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss'],
})
export class ExamenComponent implements OnInit {
  listaElementos: IExamen[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;

  constructor(
    private router: Router,
    private service: ExamenService,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  ngOnInit(): void {
    this.getAllActivosElementos();
  }


  getColumnasTabla(): void {
    this.cols = [
      { field: 'idAnalisis', header: 'ID Examen', visibility: true, formatoFecha: '' },
      { field: 'nombre', header: 'Nombre', visibility: true, formatoFecha: '' },
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'precio', header: 'Precio', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  getAllActivosElementos() {
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

  eliminarElemento(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.service.setInactive(data.idAnalisis).subscribe((res) => {
            this.getAllActivosElementos();
            this.servicioMensajesSwal.mensajeRegistroEliminado();
          });
        }
      });
  }



  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.editarElemento(data);
        break;

      case 'eliminar':
        this.eliminarElemento(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  editarElemento(data: any) {
    const id = data.idAnalisis;
    this.router.navigateByUrl(`examenes/mantenimiento-examen/${id}`);
  }
}
