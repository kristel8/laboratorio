import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IDetalleItemVenta, IListDetalleVenta, IVentas } from '../../models/ventas';
import { VentaService } from '../../services/venta.service';
import * as printJS from 'print-js';
import { AuthService } from 'src/app/auth/services/auth.service';
import { VariablesGlobales } from 'src/app/global/tienda.utils';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  listaElementos: IVentas[] = [];
  listaDetalleVenta: IDetalleItemVenta[] = [];
  cols: IColumnasTabla[] = [];
  colsDetalle: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;
  isVerDetalle: boolean = false;
  acciones: IButton[] = [];
  isAdmin: boolean = false;
  totalVenta: string = '';

  constructor(
    private ventaService: VentaService,
    private router: Router,
    private authService: AuthService,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  ngOnInit(): void {
    this.getElementos();

    const isAdmin = this.authService.usuario.tipoUsuario === VariablesGlobales.TIPO_USUARIO
    console.log(isAdmin)
    this.acciones = [
      {
        icono: 'pi pi-search',
        clase: 'rounded',
        evento: 'ver',
        estado: true,
        tooltip: 'Ver'
      },
      {
        icono: 'pi pi-times',
        clase: 'rounded-danger',
        evento: 'anular',
        estado: isAdmin,
        tooltip: 'Anular'
      },
      {
        icono: 'pi pi-print',
        clase: 'rounded-help',
        evento: 'imprimir',
        estado: true,
        tooltip: 'Imprimir'
      },
    ]
  }

  getElementos() {
    const obs = new Observable<boolean>((observer) => {
      this.ventaService.getAllActive().subscribe((resp) => {
        this.listaElementos = resp;
        this.listaElementos.forEach((el) => {
          el['datosCliente'] = el.cliente.nombre + el.cliente.apellido
        });
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

  verDetalle(data: any): void {
    this.isVerDetalle = true;
    const obs = new Observable<boolean>((observer) => {
      this.ventaService.getDetalleVenta(data.idVenta).subscribe((resp) => {
        const { detalleVenta, mensaje, totalVenta } = resp;
        this.listaDetalleVenta = detalleVenta;
        this.totalVenta = totalVenta;
        observer.next(true);
      });
    });

    obs.subscribe((res) => {
      if (res) {
        this.isCargado = res;
        this.getColumnasTablaDetalle();
      }
    });
  }

  getColumnasTabla() {
    this.cols = [
      { field: 'tipoComprobante', header: 'Tipo Comprobante', visibility: true, formatoFecha: '' },
      { field: 'serieCompro', header: 'Serie Comprobante', visibility: true, formatoFecha: '' },
      { field: 'numCompro', header: 'Número Comprobante', visibility: true, formatoFecha: '' },
      { field: 'datosCliente', header: 'Cliente', visibility: true, formatoFecha: '' },
      { field: 'fecha', header: 'Fecha', visibility: true, formatoFecha: '' },
      { field: 'totalVenta', header: 'Total Venta', visibility: true, formatoFecha: '' },
      { field: 'tipoMoneda', header: 'Tipo Moneda', visibility: true, formatoFecha: '' },
      { field: 'tipoPago', header: 'Tipo Pago', visibility: true, formatoFecha: '' },
      { field: 'estadoVenta', header: 'Estado Venta', visibility: true, formatoFecha: '' },
      { field: 'usuario', subField: 'usuario', header: 'Usuario', visibility: true, formatoFecha: '' },
      { field: 'sucursal', subField: 'nombreSucur', header: 'Nombre Sucursal', visibility: true, formatoFecha: '' },
      { field: 'cantidadPago', header: 'Cantidad de Pago', visibility: true, formatoFecha: '' },
      { field: 'vuelto', header: 'Vuelto', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  getColumnasTablaDetalle() {
    this.colsDetalle = [
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'cantidad', header: 'Cantidad', visibility: true, formatoFecha: '' },
      { field: 'precio', header: 'Precio', visibility: true, formatoFecha: '' },
    ];
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'anular':
        this.anularElemento(data);
        break;

      case 'imprimir':
        this.imprimirTicket(data);
        break;

      case 'ver':
        this.verDetalle(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  anularElemento(data: any) {
    if (data.estadoVenta === 'ANULADO') {
      return
    }

    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de anular la venta?')
      .then((response) => {
        if (response.isConfirmed) {
          this.ventaService
            .setVentaAnulada(data.idVenta)
            .subscribe((res) => {
              this.getElementos();
              this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
            });
        }
      });
  }

  imprimirTicket(event: any): void {
    this.ventaService.getComprobanteVenta(event.idVenta).subscribe((response) => {
      const base64 = response.comprobante?.file;
      printJS({ printable: base64, type: 'pdf', base64: true })
    });
  }
}
