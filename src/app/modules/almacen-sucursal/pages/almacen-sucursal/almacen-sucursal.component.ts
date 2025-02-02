import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IAlmacenSucursal } from '../../models/almacen-sucursal';
import { AlmacenSucursalService } from '../../services/almacen-sucursal.service';

@Component({
  selector: 'app-almacen-sucursal',
  templateUrl: './almacen-sucursal.component.html',
  styleUrls: ['./almacen-sucursal.component.scss']
})
export class AlmacenSucursalComponent implements OnInit {
  listaElementos: IAlmacenSucursal[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;
  acciones: IButton[] = [];

  constructor(
    private almacenSucursalService: AlmacenSucursalService,
    private router: Router,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private authService: AuthService
  ) {
  }


  ngOnInit(): void {
    this.getElementos();

    this.acciones = [
      {
        icono: 'pi pi-search',
        clase: 'rounded',
        evento: 'mostrar',
        estado: true,
        tooltip: 'Mostrar detalle'
      },
    ]
  }

  getElementos() {

  }

  getColumnasTabla() {
    this.cols = [
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'stockActual', header: 'Stock Actual', visibility: true, formatoFecha: '' },
      { field: 'stockMinTienda', header: 'Stock Mínimo', visibility: true, formatoFecha: '' },
      { field: 'estadoStocks', header: 'Estado Stocks', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'mostrar':
        this.mostrarDetalleAlmacenSucursal(data);
        break;
    }
  }

  mostrarDetalleAlmacenSucursal(data: any) {
    const idProducto = data.idProducto;
    this.router.navigateByUrl(`almacen-sucursal/detalle-almacen-sucursal/${idProducto}`);
  }

}
