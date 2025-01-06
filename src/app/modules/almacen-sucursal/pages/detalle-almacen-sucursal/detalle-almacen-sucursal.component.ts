import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IDetalleAlmacenSucursal } from '../../models/almacen-sucursal';
import { AlmacenSucursalService } from '../../services/almacen-sucursal.service';

@Component({
  selector: 'app-detalle-almacen-sucursal',
  templateUrl: './detalle-almacen-sucursal.component.html',
  styleUrls: ['./detalle-almacen-sucursal.component.scss']
})
export class DetalleAlmacenSucursalComponent implements OnInit {
  id!: number;
  listaElementos: IDetalleAlmacenSucursal[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;
  acciones: IButton[] = [];

  constructor(
    private almacenSucursalService: AlmacenSucursalService,
    private router: Router,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private authService: AuthService,
    private _ActivatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.id = +id!;

    this.getElementos();

    this.acciones = [
      {
        icono: 'pi pi-check',
        clase: 'rounded',
        evento: 'vender',
        estado: true,
        tooltip: 'Cambiar estado a Vender'
      },
    ]
  }

  getElementos() {

  }

  getColumnasTabla() {
    this.cols = [
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'stockActual', header: 'Stock Actual', visibility: true, formatoFecha: '' },
      { field: 'recibido', header: 'Recibido', visibility: true, formatoFecha: '' },
      { field: 'precioVenta', header: 'Precio Venta', visibility: true, formatoFecha: '' },
      { field: 'descuentoMaximo', header: 'Descuento Máximo', visibility: true, formatoFecha: '' },
      { field: 'precioventaxMayor', header: 'Precio Venta x Mayor', visibility: true, formatoFecha: '' },
      { field: 'isparavender', header: 'Estado en Stock', visibility: true, formatoFecha: '' },
      { field: 'codigoEnvio', header: 'Código Envío', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'vender':
        this.cambiarParaVender(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  cambiarParaVender( data: any ) {
    this.servicioMensajesSwal
    .mensajePregunta('¿Está seguro de cambiar estado a vender?')
    .then((response) => {
      if (response.isConfirmed) {
        this.almacenSucursalService
          .setIsParaVenderActive(data.idAlmacenSucursal)
          .subscribe((res) => {
            this.getElementos();
            this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
          });
      }
    });
  }

}
