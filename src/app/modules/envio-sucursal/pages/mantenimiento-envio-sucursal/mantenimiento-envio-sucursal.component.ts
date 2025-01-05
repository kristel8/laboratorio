import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAlmacenCentral, IDetalleAlmacenCentral } from 'src/app/modules/almacen-central/models/almacen-central';
import { AlmacenCentralService } from 'src/app/modules/almacen-central/services/almacen-central.service';
import { ISucursal } from 'src/app/modules/sucursal/models/sucursal';
import { SucursalService } from 'src/app/modules/sucursal/services/sucursal.service';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { rangeStockValidator } from 'src/app/shared/validators/range-stock';
import { EnvioSucursalService } from '../../services/envio-sucursal.service';

@Component({
  selector: 'app-mantenimiento-envio-sucursal',
  templateUrl: './mantenimiento-envio-sucursal.component.html',
  styleUrls: ['./mantenimiento-envio-sucursal.component.scss']
})
export class MantenimientoEnvioSucursalComponent implements OnInit {

  titulo: string = 'Insertar Envío Sucursal';
  listaSucursal: ISucursal [] = [];
  listaAlmacenProductos: IDetalleAlmacenCentral [] = [];
  isBuscadorAlmacen: boolean = false;
  colsAlmacenProductos: IColumnasTabla [] = [];
  colsAlmacenProductosVisibles: IColumnasTabla[] = [];

  colsEnvioSucursal: IColumnasTabla [] = [];
  colsEnvioSucursalVisibles: IColumnasTabla[] = [];

  rowAlmacenProductoSeleccionado!: IAlmacenCentral;

  tipoDeMoneda: string = 'S/';

  constructor(
    private fb: FormBuilder,
    private sucursalService: SucursalService,
    private almacenService: AlmacenCentralService,
    private envioSucursalService: EnvioSucursalService,
    private router: Router,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  envioForm = this.fb.group({
    sucursal: [null, [Validators.required]],
  });

  itemsForm = this.fb.group({
    items: this.fb.array([], Validators.required),
  });


  ngOnInit(): void {
    this.getSucursal();
    this.getColumnasTablaAlmacen();
  }


  get sucursal() {
    return this.envioForm.get('sucursal');
  }

  get items() {
    return this.itemsForm.controls['items'] as FormArray;
  }


  getSucursal() {
    this.sucursalService.getSucursalActivos().subscribe(res => {
      this.listaSucursal = res;
    })
  }

  guardarEnvioSucursal(event: any) {
    event.preventDefault();

    const paramsenvioSucursal = this.items.value;
    this.envioSucursalService.inserEnvioSucural(paramsenvioSucursal)
      .subscribe((res) => {
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
        this.router.navigateByUrl('/envio-sucursal');
      });

  }

  getAlmacenProducto() {
    this.almacenService.getReporteAlmacenCentralProductoLoteListado().subscribe((res) => {
      this.listaAlmacenProductos = res;
    })
  }

  showBuscadorItemAlmacen() {
    this.isBuscadorAlmacen = true;
    this.getColumnasTabla();
    this.getAlmacenProducto();
  }

  getColumnasTabla() {
    this.colsAlmacenProductos = [
      {
        field: 'descripcion',
        header: 'Descripción',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'stockActual',
        header: 'Stock Actual',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'precioCompra',
        header: 'Precio Compra',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'lote',
        header: 'Lote',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'unidadMedida',
        header: 'Unidad Medidad',
        visibility: true,
        formatoFecha: '',
      },
    ];

    this.colsAlmacenProductosVisibles = this.colsAlmacenProductos.filter(
      (x) => x.visibility == true
    );
  }

  getColumnasTablaAlmacen() {
    this.colsEnvioSucursal = [
      {
        field: 'descripcion',
        header: 'Descripción',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'precioCompra',
        header: 'Precio Compra',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'cantidadEnvio',
        header: 'Cantidad Envío',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'precioVenta',
        header: 'Precio Venta',
        visibility: true,
        formatoFecha: '',
      },
      { field: 'precioVentaXMayor', header: 'Precio Venta Por Mayor', visibility: true, formatoFecha: '' },
      {
        field: 'descuentoMaximo',
        header: 'Descuento Máximo',
        visibility: true,
        formatoFecha: '',
      },
    ];

    this.colsEnvioSucursalVisibles = this.colsEnvioSucursal.filter(
      (x) => x.visibility == true
    );
  }

  deleteItem(index: number, controls: any) {
    console.log(controls);
    this.items.removeAt(index);
  }

  onRowAlmacenProductoSelected(event: any) {
    this.rowAlmacenProductoSeleccionado = event.data;
  }

  putFilaSeleccionado(event: any) {
    this.buildListaItem(event);
  }

  buildListaItem(event: any) {
    console.log(event)
    let sucursal = this.envioForm.value.sucursal;
    const listaItemsForm = this.fb.group({
      idAlmacenCentral: [+event.idAlmacenCentral], //
      idSucursal: sucursal.idSucursal, //
      descripcion: [event.descripcion],
      precioCompra: [event.precioCompra],
      cantidadEnvio: [null, [Validators.required, rangeStockValidator(event.stockActual)]],
      precioVenta: [null, Validators.required],
      precioVentaXMayor: [null, Validators.required],
      descuentoMaximo: [null, Validators.required],
      estado: [true],

    });

    this.items.push(listaItemsForm);
  }

}
