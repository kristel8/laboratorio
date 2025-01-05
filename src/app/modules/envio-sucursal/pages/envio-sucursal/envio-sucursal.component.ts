import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IEnvioSucursal } from '../../models/envio-sucursal';
import { EnvioSucursalService } from '../../services/envio-sucursal.service';

@Component({
  selector: 'app-envio-sucursal',
  templateUrl: './envio-sucursal.component.html',
  styleUrls: ['./envio-sucursal.component.scss']
})
export class EnvioSucursalComponent implements OnInit {
  listaElementos: IEnvioSucursal[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;

  constructor(
    private envioSucursalService: EnvioSucursalService,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  ngOnInit(): void {
    this.getElementos();
  }

  getElementos() {
    const obs = new Observable<boolean>((observer) => {
      this.envioSucursalService.getEnvioSucursalActivos().subscribe((resp) => {
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

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'eliminar':
        this.eliminarEnvio(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  eliminarEnvio(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.envioSucursalService
            .deleteEnvioSucursal(data.idEnvioSucursal)
            .subscribe((res) => {
              this.getElementos();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }
}
