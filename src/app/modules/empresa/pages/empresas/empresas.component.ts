import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  ITable,
  ITableCaption,
  ITableHeader,
} from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IEmpresa } from '../../models/empresa';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
})
export class EmpresasComponent implements OnInit {
  listaElementos: IEmpresa[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;

  constructor(
    private empresaService: EmpresaService,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /* Listado de empresas activas */
    this.getEmpresas();
  }

  getEmpresas() {
    const obs = new Observable<boolean>((observer) => {
      this.empresaService.getEmpresasActivos().subscribe((resp) => {
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

  getColumnasTabla() {
    this.cols = [
      {
        field: 'razonSocial',
        header: 'Razón Social',
        visibility: true,
        formatoFecha: '',
      },
      { field: 'ruc', header: 'RUC', visibility: true, formatoFecha: '' },
      {
        field: 'direccion',
        header: 'Dirección',
        visibility: true,
        formatoFecha: '',
      },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.editarEmpresa(data);
        break;

      case 'eliminar':
        this.eliminarEmpresa(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  editarEmpresa(data: any) {
    const idEmpresa = data.idEmpresa;
    this.router.navigateByUrl(`empresas/mantenimiento-empresa/${idEmpresa}`);
  }

  eliminarEmpresa(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.empresaService
            .deleteEmpresas(data.idEmpresa)
            .subscribe((res) => {
              this.getEmpresas();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }
}
