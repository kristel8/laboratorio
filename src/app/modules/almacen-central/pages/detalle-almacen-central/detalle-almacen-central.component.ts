import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IDetalleAlmacenCentral } from '../../models/almacen-central';
import { AlmacenCentralService } from '../../services/almacen-central.service';

@Component({
  selector: 'app-detalle-almacen-central',
  templateUrl: './detalle-almacen-central.component.html',
  styleUrls: ['./detalle-almacen-central.component.scss']
})
export class DetalleAlmacenCentralComponent implements OnInit {

  titulo: string = '';
  id!: number;

  listaElementos: IDetalleAlmacenCentral[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;

  constructor(
    private almacenCentralService: AlmacenCentralService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.id = +id!;
    this.titulo = 'Reporte Almacén Central por Lote';
    this.getElementos();

  }

  getElementos() {
    const obs = new Observable<boolean>((observer) => {
      this.almacenCentralService.getDetalleAlmacenCentralActivos(this.id).subscribe((resp) => {
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
      { field: 'stockActual', header: 'Stock Actual', visibility: true, formatoFecha: '' },
      { field: 'precioCompra', header: 'Precio Compra', visibility: true, formatoFecha: '' },
      { field: 'lote', header: 'Lote', visibility: true, formatoFecha: '' },
      { field: 'unidadMedida', header: 'Unidad Medida', visibility: true, formatoFecha: '' },
      { field: 'fechaIngreso', header: 'Fecha Ingreso', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];


    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

}
