import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IAtencionLista } from '../../models/atencion';
import { AtencionService } from '../../services/atencion.service';
import { Router } from '@angular/router';

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
      { field: 'idAtencion', header: 'Nr Orden', visibility: true, formatoFecha: '' },
      { field: 'apellidoYNombrePaciente', header: 'Apellidos y Nombres Paciente', visibility: true, formatoFecha: '' },
      { field: 'apellidoYNombreDoctor', header: 'Apellidos y Nombres Doctor', visibility: true, formatoFecha: '' },
      { field: 'estadoOrden', header: 'Estado Orden', visibility: true, formatoFecha: '' },
      { field: 'fecha', header: 'Fecha Creacion', visibility: true, formatoFecha: '' },
      { field: 'usuario', header: 'Usuario Creacion', visibility: true, formatoFecha: '' },
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
            .subscribe(() => {
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
        this.verElemento(data);
        break;

      case 'eliminar':
        this.eliminarElemento(data);
        break;
    }
  }

  verElemento(data: any) {
    const id = data.idAtencion ;
    this.router.navigateByUrl(`atencion/crear-atencion/${id}`);
  }
}
