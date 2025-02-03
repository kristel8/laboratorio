import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IAtencionLista } from '../../models/atencion';
import { IButton } from 'src/app/shared/components/table/models/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AtencionService } from '../../services/atencion.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.scss'],
})
export class AtencionComponent implements OnInit {
  listaElementos: IAtencionLista[] = [];

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  acciones: IButton[] = [];
  isCargado: boolean = false;

  constructor(
    private service: AtencionService,
    private router: Router,
    private readonly servicioMensajesSwal: MensajesSwalService,
  ) { }

  ngOnInit(): void {
    this.getAllActivosElementos();

    this.acciones = [
      {
        icono: 'pi pi-eye',
        clase: 'rounded-success',
        evento: 'ver',
        estado: true,
        tooltip: 'Ver'
      },
      {
        icono: 'pi pi-trash',
        clase: 'rounded-danger',
        evento: 'eliminar',
        estado: true,
        tooltip: 'Eliminar'
      },
    ]
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
      { field: 'nrOrden', header: 'Nr Orden', visibility: true, formatoFecha: '' },
      { field: 'apellidoYNombrePaciente', header: 'Apellidos y Nombres Paciente', visibility: true, formatoFecha: '' },
      { field: 'apellidoYNombreDoctor', header: 'Apellidos y Nombres Doctor', visibility: true, formatoFecha: '' },
      { field: 'estadoOrden', header: 'Estado Orden', visibility: true, formatoFecha: '' },
      { field: 'fechaCreacion', header: 'Fecha Creacion', visibility: true, formatoFecha: '' },
      { field: 'usuarioCreacion', header: 'Usuario Creacion', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eliminarElemento(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.service
            .setInactive(data.idAtencion)
            .subscribe((res) => {
              this.getAllActivosElementos();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'ver':
        break;

      case 'eliminar':
        this.eliminarElemento(data);
        break;
    }
  }
}
