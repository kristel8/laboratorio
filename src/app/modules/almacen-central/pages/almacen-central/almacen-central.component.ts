import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IAlmacenCentral } from '../../models/almacen-central';
import { AlmacenCentralService } from '../../services/almacen-central.service';

@Component({
  selector: 'app-almacen-central',
  templateUrl: './almacen-central.component.html',
  styleUrls: ['./almacen-central.component.scss']
})
export class AlmacenCentralComponent implements OnInit {
  listaElementos: IAlmacenCentral[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;
  acciones: IButton[] = [];

  constructor(
    private almacenCentralService: AlmacenCentralService,
    private router: Router,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

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
    const obs = new Observable<boolean>((observer) => {
      this.almacenCentralService.getAlmacenCentralActivos().subscribe((resp) => {
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
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'stockTotal', header: 'Stock Total', visibility: true, formatoFecha: '' },
      { field: 'stockmingeneral', header: 'Stock General', visibility: true, formatoFecha: '' },
      { field: 'estadostocks', header: 'Estado Stocks', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }


  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'mostrar':
        this.mostrarDetalleAlmacenCentral(data);
        break;
    }
  }

  mostrarDetalleAlmacenCentral(data: any) {
    const idProducto = data.idproducto;
    this.router.navigateByUrl(`almacen-central/detalle-almacen-central/${idProducto}`);
  }
}
