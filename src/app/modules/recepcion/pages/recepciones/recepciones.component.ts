import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IRecepcion } from '../../models/recepcion';
import { RecepcionService } from '../../services/recepcion.service';

@Component({
  selector: 'app-recepciones',
  templateUrl: './recepciones.component.html',
  styleUrls: ['./recepciones.component.scss']
})
export class RecepcionesComponent implements OnInit {

  listaElementos: IRecepcion[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;
  acciones: IButton[] = [];

  constructor(
    private recepcionService: RecepcionService,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getAllActivosElementos();

    this.acciones = [
      {
        icono: 'pi pi-check',
        clase: 'outlined-rounded-success',
        evento: 'recepcionar',
        estado: true,
        tooltip: 'Recepcionar'
      },
      {
        icono: 'pi pi-times',
        clase: 'outlined-rounded-danger',
        evento: 'rechazar',
        estado: true,
        tooltip: 'Rechazar'
      }
    ]

  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'recepcionar':
        this.setReceived(data);
        break;

      case 'rechazar':
        this.setCanceled(data);
        break;


      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  getColumnasTabla() {
    this.cols = [
      { field: 'nombreSucur', header: 'Nombre Sucursal', visibility: true, formatoFecha: '' },
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'cantidadEnvio', header: 'Cantidad Envío', visibility: true, formatoFecha: '' },
      { field: 'precioVenta', header: 'Precio Venta', visibility: true, formatoFecha: '' },
      { field: 'precioVentaXMayor', header: 'Precio Venta Mayor', visibility: true, formatoFecha: '' },
      { field: 'descuentoMaximo', header: 'Descuento Máximo', visibility: true, formatoFecha: '' },
      { field: 'estadoEnvio', header: 'Estado Envío', visibility: true, formatoFecha: '' },
      { field: 'recepcionadoPor', header: 'Recepcionado por', visibility: true, formatoFecha: '' },
      { field: 'creadoPor', header: 'Creado por', visibility: true, formatoFecha: '' },
      { field: 'fechaCreacion', header: 'Fecha Creación', visibility: true, formatoFecha: '' },
      { field: 'fechaModificacion', header: 'Fecha Modificación', visibility: true, formatoFecha: '' },
      { field: 'fechaRecepcion', header: 'Fecha Recepción', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  getAllActivosElementos() {
    const obs = new Observable<boolean>((observer) => {
      const estadoEnvio = 'TODO';
      this.recepcionService.getAllActive( String(this.authService.usuario.idSucursal), estadoEnvio).subscribe((resp) => {
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

  setCanceled(data: any) {
    this.servicioMensajesSwal.mensajePregunta('¿Está seguro de cancelar el registro?').then((response) => {
      if (response.isConfirmed) {
        this.recepcionService.setCanceled(data.idEnvioSucursal).subscribe((res) => {
          this.servicioMensajesSwal.mensajeExito('');
          this.getAllActivosElementos();
        });
      }
    });
  }

  setReceived(data: any) {
    this.servicioMensajesSwal.mensajePregunta('¿Está seguro de recibir el registro?').then((response) => {
      if (response.isConfirmed) {
        this.recepcionService.setReceived(String(this.authService.usuario.idSucursal), data.idEnvioSucursal, this.authService.usuario.empleado).subscribe((res) => {
          this.servicioMensajesSwal.mensajeExito('');
          this.getAllActivosElementos();
        });
      }
    });
  }
}
