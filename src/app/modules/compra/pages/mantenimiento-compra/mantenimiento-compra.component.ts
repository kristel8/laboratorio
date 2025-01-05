import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProveedor } from 'src/app/modules/proveedor/models/proveedor';
import { ProveedorService } from 'src/app/modules/proveedor/services/proveedor.service';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { ICompra, IDetalleCompra, IProducto } from '../../models/compra';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-mantenimiento-compra',
  templateUrl: './mantenimiento-compra.component.html',
  styleUrls: ['./mantenimiento-compra.component.scss'],
})
export class MantenimientoCompraComponent implements OnInit {
  titulo: string = 'Nueva Compra';

  colsProveedores: IColumnasTabla[] = [];
  colsProveedoresVisibles: IColumnasTabla[] = [];

  colsProductos: IColumnasTabla[] = [];
  colsProductosVisibles: IColumnasTabla[] = [];

  colsItemCompra: IColumnasTabla[] = [];
  colsItemCompraVisibles: IColumnasTabla[] = [];

  listaTipoComprobante: any[] = [];
  listaTipoPago: any[] = [];
  listaTipoMoneda: any[] = [];

  listaProveedores: IProveedor[] = [];
  isProveedorInvalid: boolean = false;
  isBuscadorDeProveedor: boolean = false;
  rowProveedorSeleccionado!: IProveedor;

  listaProductos: IProducto[] = [];
  isProductoInvalid: boolean = false;
  isBuscadorDeProducto: boolean = false;

  totalFinal: number = 0;

  tipoDeMoneda: string = 'S/';

  idCompra: number = 0;
  isEditar: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private compraService: CompraService,
    private readonly formatoFecha: DatePipe,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  compraForm = this.fb.group({
    numProveedor: [null, [Validators.required]],
    proveedor: [{ value: null, disabled: true }, [Validators.required]],
    fecha: [new Date(), [Validators.required]],
    tipoDeComprobante: [null, [Validators.required]],
    serie: [null, [Validators.required]],
    numero: [null, [Validators.required]],
    asunto: [null],
    descripcion: [null],
    tipoMoneda: ['SOLES'],
    tipoPago: [null, [Validators.required]],
  });

  itemsForm = this.fb.group({
    items: this.fb.array([], Validators.required),
  });

  ngOnInit(): void {
    this.getProveedor();
    this.getProductos();
    this.getColumnasTablaCompra();

    this.listaTipoComprobante = [
      {
        tipo: 'BOLETA',
      },
      {
        tipo: 'FACTURA',
      },
      {
        tipo: 'TICKET',
      },
    ];

    this.listaTipoMoneda = [
      {
        tipo: 'SOLES',
        simbolo: 'S/',
      },
      {
        tipo: 'DOLARES',
        simbolo: '$',
      },
    ];

    this.listaTipoPago = [
      {
        tipo: 'EFECTIVO',
      },
      {
        tipo: 'TRANSFERENCIA',
      },
      {
        tipo: 'CHEQUE',
      },
    ];

    const input = this.elementRef.nativeElement.querySelector('input');
    input.addEventListener('keypress', (e: any) => {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
    });

    const button = this.elementRef.nativeElement.querySelector('button');
    button.addEventListener('click', (e: any) => {
      e.preventDefault();
    });

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Compra';
      this.idCompra = +id;
      this.isEditar = true;
      this.buscarIdCompra();
    }
  }

  get proveedor() {
    return this.compraForm.get('proveedor');
  }

  get numProveedor() {
    return this.compraForm.get('numProveedor');
  }

  get fecha() {
    return this.compraForm.get('fecha');
  }

  get tipoDeComprobante() {
    return this.compraForm.get('tipoDeComprobante');
  }

  get tipoPago() {
    return this.compraForm.get('tipoPago');
  }

  get serie() {
    return this.compraForm.get('serie');
  }

  get numero() {
    return this.compraForm.get('numero');
  }

  get asunto() {
    return this.compraForm.get('asunto');
  }

  get descripcion() {
    return this.compraForm.get('descripcion');
  }

  get items() {
    return this.itemsForm.controls['items'] as FormArray;
  }

  onChangeTipoDeMoneda(event: any) {
    if (event.value === 'SOLES') {
      this.tipoDeMoneda = 'S/';
    } else {
      this.tipoDeMoneda = '$';
    }
  }

  getProveedor() {
    this.proveedorService.getProveedorActivos().subscribe((res) => {
      this.listaProveedores = res;
    });
  }

  getProductos() {
    this.compraService.getProductosActivos().subscribe((res) => {
      this.listaProductos = res;
    });
  }

  buscarProveedor(event: any) {
    this.isProveedorInvalid = false;
    const valorActual = this.compraForm.value.numProveedor;
    if (valorActual && valorActual.length != 14) {
      this.compraForm.controls['proveedor'].reset();
    }

    if (event.keyCode == 13) {
      const valorEncontrado = this.listaProveedores.find(
        (x) => x.numDocumento === valorActual
      );
      if (valorEncontrado) {
        this.compraForm.patchValue({ proveedor: valorEncontrado.razonSocial });
      } else {
        this.isProveedorInvalid = true;
        this.compraForm.controls['proveedor'].reset();
      }
    }
  }

  /* GUARDAR COMPRA */
  guardarCompra(event: any) {
    event.preventDefault();

    const {
      numProveedor,
      fecha,
      tipoDeComprobante,
      serie,
      numero,
      asunto,
      descripcion,
      tipoMoneda,
      tipoPago,
    } = this.compraForm.value;

    const fechaTransformada = this.formatoFecha.transform(fecha, 'yyyy-MM-dd')!;
    const idProveedor = this.listaProveedores.find(
      (e) => e.numDocumento == numProveedor
    );
    const paramsCabecera: ICompra = {
      asunto: asunto,
      descripcion: descripcion,
      estado: true,
      estadoCompra: 'EMITIDO',
      fecha: fechaTransformada,
      fechaModificacion: '',
      fechaRecepcion: '',
      fechaRegistro: '',
      idCompra: 0,
      idEmpresa: 1,
      idProveedor: idProveedor!.idProveedor,
      numCompro: numero,
      serieCompro: serie,
      tipoCompro: tipoDeComprobante.tipo,
      tipoMoneda: tipoMoneda,
      tipoPago: tipoPago.tipo,
      totalCompra: this.totalFinal,
    };

    if (this.isEditar) {
      this.editarCompra(paramsCabecera);
    } else {
      this.crearCompra(paramsCabecera);
    }
  }

  guardarDetalleCompra(idCompra: number) {
    this.items.controls.forEach((e: any) => {
      e.patchValue({
        idCompra: +idCompra,
      });
    });

    const paramsDetalleCompra = this.items.value;
    this.compraService
      .insertDetalleCompra(paramsDetalleCompra)
      .subscribe((res) => {
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
        this.router.navigateByUrl('/compras');
      });
  }

  crearCompra(params: ICompra) {
    this.compraService.insertCompra(params).subscribe((response) => {
      const idCompra = response.idCompra;
      this.guardarDetalleCompra(idCompra);
    });
  }

  editarCompra(params: ICompra) {
    this.compraService
      .updateCompra(+this.idCompra, params)
      .subscribe((response: ICompra) => {
        this.router.navigateByUrl('/compras');
        this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      });
  }

  buscarIdCompra() {
    this.compraService.getFindByIdCompra(+this.idCompra).subscribe((res) => {
      const resultado = res;
      this.mostrarValoresInput(resultado);
      this.getDetalleCompra();
    });
  }

  mostrarValoresInput(resultado: any) {
    this.totalFinal = resultado.totalCompra;


    const tipoDeComprobante = this.listaTipoComprobante.find(
      (res) => res.tipo === resultado.tipoCompro
    );

    const tipoPago = this.listaTipoPago.find(
      (res) => res.tipo === resultado.tipoPago
    );

    const proveedor = this.listaProveedores.find(
      (res) => res.idProveedor === resultado.proveedor.idProveedor
    );

    this.compraForm.patchValue({
      numProveedor: proveedor!.numDocumento,
      proveedor: proveedor!.razonSocial,
      fecha: resultado.fechaRegistro,
      tipoDeComprobante: tipoDeComprobante,
      serie: resultado.serieCompro,
      numero: resultado.numCompro,
      asunto: resultado.asunto,
      descripcion: resultado.descripcion,
      tipoMoneda: resultado.tipoMoneda,
      tipoPago: tipoPago,
    });
  }

  getDetalleCompra() {
    this.compraService.getForIdentified(this.idCompra).subscribe((res: any) => {
      this.mostrarValoresTabla(res.detalleCompra);
    });
  }

  mostrarValoresTabla(resultado: any) {
    resultado.forEach((el: IDetalleCompra) => {
      this.buildListaItemCompra(el.idCompra);
      this.items.patchValue(resultado);
    });
  }
  /* FIN GUARDAR COMPRA */

  showBuscadorDeProveedor(event: any) {
    this.isBuscadorDeProveedor = true;
    this.getProveedor();
    this.getColumnasTablaProveedor();
  }

  showBuscadorDeProducto() {
    this.isBuscadorDeProducto = true;
    this.getColumnasTablaProducto();
  }

  /* PROVEEDOR */
  getColumnasTablaProveedor() {
    this.colsProveedores = [
      {
        field: 'tipoDocumento',
        header: 'Tipo Documento',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'numDocumento',
        header: 'Nro Documento',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'razonSocial',
        header: 'Razón Social',
        visibility: true,
        formatoFecha: '',
      },
      { field: 'rubro', header: 'Rubro', visibility: true, formatoFecha: '' },
    ];

    this.colsProveedoresVisibles = this.colsProveedores.filter(
      (x) => x.visibility == true
    );
  }

  onRowProveedorSelected(event: any) {
    this.rowProveedorSeleccionado = event.data;
  }

  putProveedorSeleccionado() {
    if (this.rowProveedorSeleccionado) {
      const { numDocumento, razonSocial } = this.rowProveedorSeleccionado;
      this.compraForm.patchValue({
        numProveedor: numDocumento,
        proveedor: razonSocial,
      });
      this.isProveedorInvalid = false;
      this.isBuscadorDeProveedor = false;
    }
  }
  /* END PROVEEDOR */

  /* PRODUCTO */
  getColumnasTablaProducto() {
    this.colsProductos = [
      { field: 'codigo', header: 'Código', visibility: true, formatoFecha: '' },
      {
        field: 'descripcion',
        header: 'Descripción',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'detalle',
        header: 'Detalle',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'categoria',
        header: 'Categoría',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'subCategoria',
        header: 'Sub Categoría',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'unidadMedida',
        header: 'Unidad',
        visibility: true,
        formatoFecha: '',
      },
      { field: 'marca', header: 'Marca', visibility: true, formatoFecha: '' },
    ];

    this.colsProductosVisibles = this.colsProductos.filter(
      (x) => x.visibility == true
    );
  }

  putProductoSeleccionado(event: any) {
    this.buildListaItemCompra(event);
  }
  /* END PRODUCTO */

  /* LISTA DE ITEMS - COMPRAS */
  getColumnasTablaCompra() {
    this.colsItemCompra = [
      {
        field: 'descripcion',
        header: 'Descripción',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'cantidad',
        header: 'Cantidad',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'precioCompra',
        header: 'Precio UND',
        visibility: true,
        formatoFecha: '',
      },
      { field: 'codigo', header: 'Lote', visibility: true, formatoFecha: '' },
      {
        field: 'subTotal',
        header: 'Subtotal',
        visibility: true,
        formatoFecha: '',
      },
    ];

    this.colsItemCompraVisibles = this.colsItemCompra.filter(
      (x) => x.visibility == true
    );
  }

  buildListaItemCompra(event: any) {
    const listaItemsForm = this.fb.group({
      descripcion: [event.descripcion, Validators.required],
      cantidad: [{ value: 0, disabled: this.isEditar }, Validators.required],
      codigo: [{ value: null, disabled: this.isEditar }, Validators.required],
      estado: [true],
      idDetalleCompra: [0],
      idProducto: [+event.idProducto], //
      idCompra: [0],
      precioCompra: [{ value: 0, disabled: this.isEditar }, Validators.required],
      subTotal: [0, Validators.required],
    });
    this.items.push(listaItemsForm);
  }

  deleteItemCompra(index: number, controls: any) {
    this.items.removeAt(index);
    const { subTotal } = controls.value;
    this.totalFinal = this.totalFinal - subTotal;
  }
  /* END LISTA DE ITEMS - COMPRAS */

  calcularSubTotal(controls: any) {
    const { cantidad, precioCompra } = controls.value;
    if (cantidad && precioCompra) {
      controls.patchValue({
        subTotal: cantidad * precioCompra,
      });
    }
    this.calcularTotal(this.items.controls);
  }

  calcularTotal(control: any) {
    this.totalFinal = 0;
    control.forEach((el: any) => {
      this.totalFinal = +el.value.subTotal + this.totalFinal;
    });
  }
}
