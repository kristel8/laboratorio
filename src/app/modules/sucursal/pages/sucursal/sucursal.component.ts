import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { ISucursal } from '../../models/sucursal';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss']
})
export class SucursalComponent implements OnInit {
  listaElementos: ISucursal[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;
  acciones: IButton[] = [];

  constructor(
    private sucursalService: SucursalService,
    private router: Router,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  ngOnInit(): void {
    this.getElementos();
  }

  getElementos() {
    const obs = new Observable<boolean>((observer) => {
      this.sucursalService.getSucursalActivos().subscribe((resp) => {
        this.listaElementos = resp;
        console.log(this.listaElementos)
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
      { field: 'configDocumentoImpreso', subField: 'tituloConfiguracion', header: 'Configuración', visibility: true, formatoFecha: '' },
      { field: 'direccion', header: 'Dirección', visibility: true, formatoFecha: '' },
      { field: 'empresa', subField: 'razonSocial', header: 'Razón Social', visibility: true, formatoFecha: '' },
      { field: 'nombreSucur', header: 'Sucursal', visibility: true, formatoFecha: '' },
      { field: 'departamento', header: 'Departamento', visibility: true, formatoFecha: '' },
      { field: 'provincia', header: 'Provincia', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data, evento } = datos;
    switch (tipo) {
      case 'editar':
        this.editarElemento(data);
        break;

      case 'eliminar':
        this.elminarElemento(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  editarElemento(data: any) {
    const id = data.idSucursal;
    this.router.navigateByUrl(`sucursales/mantenimiento-sucursal/${id}`);
  }

  elminarElemento(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.sucursalService
            .deleteCompra(data.idSucursal)
            .subscribe((res) => {
              this.getElementos();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }
}
