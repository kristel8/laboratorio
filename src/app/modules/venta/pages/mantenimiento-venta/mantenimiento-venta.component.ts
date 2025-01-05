import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as printJS from 'print-js';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ICliente } from 'src/app/modules/cliente/models/cliente';
import { ClienteService } from 'src/app/modules/cliente/services/cliente.service';
import { IConfigDocumentoImpreso } from 'src/app/modules/config-documento-impreso/models/configDocumentoImpreso';
import { ConfigDocumentoImpresoService } from 'src/app/modules/config-documento-impreso/services/config-documento-impreso.service';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IDetalleVenta, IProductoVenta, IVenta } from '../../models/ventas';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-mantenimiento-venta',
  templateUrl: './mantenimiento-venta.component.html',
  styleUrls: ['./mantenimiento-venta.component.scss']
})
export class MantenimientoVentaComponent implements OnInit {

  colsProductosVenta: IColumnasTabla[] = [];
  colsProductosVentaVisibles: IColumnasTabla[] = [];

  colsCarrito: IColumnasTabla[] = [];
  colsCarritoVisibles: IColumnasTabla[] = [];

  acciones: IButton[] = [];

  listaElementos: IProductoVenta[] = [];
  listaCarrito: IDetalleVenta[] = [];
  listaCliente: ICliente[] = [];

  isEditar: boolean = false;
  isCargado: boolean = false;

  totalFinal: number = 0;
  tipoDeMoneda: string = 'S/';

  isMostrarVenta: boolean = false;

  listaTipoComprobante: any[] = [];
  listaTipoPago: any[] = [];
  listaTipoMoneda: any[] = [];

  isClienteInvalid: boolean = false;
  isValorAPagarInvalid: boolean = false;

  idConfigDocumentoImpreso: number = 0;

  $responseDocumentoImpreso = new Subject<IConfigDocumentoImpreso>();

  constructor(
    private ventaService: VentaService,
    private clienteService: ClienteService,
    private router: Router,
    private fb: FormBuilder,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private authService: AuthService,
    private elementRef: ElementRef,
    private configDocumentoImpresoService: ConfigDocumentoImpresoService
  ) {
  }

  ventaForm = this.fb.group({
    numCliente: [null, [Validators.required]],
    idCliente: [null],
    cliente: [{ value: null, disabled: true }, [Validators.required]],
    cantidadPago: [null, [Validators.required]],
    numCompro: [null, [Validators.required]],
    serieCompro: [null, [Validators.required]],
    tipoComprobante: [null, [Validators.required]],
    tipoMoneda: ['SOLES'],
    tipoPago: [null, [Validators.required]],
    totalVenta: [this.totalFinal],
    vuelto: [{ value: null, disabled: true }],
  });

  itemsForm = this.fb.group({
    items: this.fb.array([], Validators.required),
  });

  get items() {
    return this.itemsForm.controls['items'] as FormArray;
  }

  get idCliente() {
    return this.ventaForm.get('idCliente');
  }

  get numCliente() {
    return this.ventaForm.get('numCliente');
  }

  get cliente() {
    return this.ventaForm.get('cliente');
  }

  get cantidadPago() {
    return this.ventaForm.get('cantidadPago');
  }

  get fecha() {
    return this.ventaForm.get('fecha');
  }

  get numCompro() {
    return this.ventaForm.get('numCompro');
  }

  get serieCompro() {
    return this.ventaForm.get('serieCompro');
  }

  get tipoComprobante() {
    return this.ventaForm.get('tipoComprobante');
  }

  get tipoMoneda() {
    return this.ventaForm.get('tipoMoneda');
  }

  get tipoPago() {
    return this.ventaForm.get('tipoPago');
  }

  get totalVenta() {
    return this.ventaForm.get('totalVenta');
  }

  get vuelto() {
    return this.ventaForm.get('vuelto');
  }


  ngOnInit(): void {
    this.getElementos();
    this.getColumnasCarrito();
    this.acciones = [
      {
        icono: 'pi pi-plus',
        clase: 'rounded',
        evento: 'agregar',
        estado: true,
        tooltip: 'Añadir a carrito'
      },
    ];

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

  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'agregar':
        this.agregarItem(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  listarCliente(): void {
    this.clienteService.getAllActivos().subscribe((res: any) => { this.listaCliente = res });
  }

  buscarCliente(event: any): void {
    const valorActual = this.numCliente?.value;

    if (valorActual && (valorActual.length != 8 || valorActual.length != 11)) {
      this.ventaForm.controls['cliente'].reset();
    }

    if (event.keyCode == 13) {
      const valorEncontrado = this.listaCliente.find(
        (x) => x.numDocumento === valorActual
      );

      if (valorEncontrado) {
        this.ventaForm.patchValue({ cliente: `${valorEncontrado.apellido} ${valorEncontrado.nombre}` });
        this.idCliente?.setValue(valorEncontrado.idCliente);

      } else {
        this.ventaForm.controls['cliente'].reset();
      }
    }
  }

  /* LISTA DE PRODUCTOS VENTA */

  getColumnasTablaProductoVenta(): void {
    this.colsProductosVenta = [
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'precioVenta', header: 'Precio Venta', visibility: true, formatoFecha: '' },
      { field: 'descuentoMaximo', header: 'Descuento Máximo', visibility: true, formatoFecha: '' },
      { field: 'stockActual', header: 'Stock Actual', visibility: true, formatoFecha: '' },
    ];

    this.colsProductosVentaVisibles = this.colsProductosVenta.filter(
      (x) => x.visibility == true
    );
  }

  getColumnasCarrito(): void {
    this.colsCarrito = [
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'cantidad', header: 'Cantidad', visibility: true, formatoFecha: '' },
      { field: 'precio', header: 'Precio', visibility: true, formatoFecha: '' },
      { field: 'descuento', header: 'Descuento Máximo', visibility: true, formatoFecha: '' },
      { field: 'total', header: 'Total', visibility: true, formatoFecha: '' },
    ];

    this.colsCarritoVisibles = this.colsCarrito.filter(
      (x) => x.visibility == true
    );
  }

  getElementos(): void {
    const obs = new Observable<boolean>((observer) => {
      this.ventaService.getListadoProductoVenta(+this.authService.usuario.idSucursal).subscribe((resp) => {
        this.listaElementos = resp;
        observer.next(true);
      });
    });

    obs.subscribe((res) => {
      if (res) {
        this.isCargado = res;
        this.getColumnasTablaProductoVenta();
      }
    });
  }

  getIdConfigDocumentoImpreso(): void {
    this.configDocumentoImpresoService.getFindByIdConfigDocumentoImpresos(+this.authService.usuario.idConfigDocumentoImpreso).subscribe(response => {
      this.$responseDocumentoImpreso.next(response);
    });
  }

  pagarVenta(): void {
    this.listarCliente();
    this.isMostrarVenta = true;
    this.ventaForm.reset();
    this.tipoMoneda?.setValue('SOLES');
    this.isValorAPagarInvalid = false;
  }

  guardarVenta(event: any): void {
    const {
      cantidadPago,
      numCompro,
      serieCompro,
      tipoComprobante,
      tipoMoneda,
      tipoPago,
    } = this.ventaForm.value;

    const params: IVenta = {
      cantidadPago: cantidadPago,
      idCliente: this.idCliente?.value,
      idSucursal: +this.authService.usuario.idSucursal,
      idUsuario: +this.authService.usuario.idUsuario,
      idConfigDocumentoImpreso: +this.idConfigDocumentoImpreso,
      idVenta: 0,
      numCompro: numCompro,
      serieCompro: serieCompro,
      tipoComprobante: tipoComprobante.tipo,
      tipoMoneda: tipoMoneda,
      tipoPago: tipoPago.tipo,
      totalVenta: this.totalFinal,
      vuelto: this.vuelto!.value
    }
    this.crearVenta(params);
  }

  guardarDetalleVenta(idVenta: number): void {
    this.items.controls.forEach((e: any) => {
      e.patchValue({
        idVenta: +idVenta,
      });
    });

    const paramsDetalleVenta = this.items.value;

    this.ventaService
      .insertDetalleVenta(paramsDetalleVenta)
      .subscribe((res) => {
        this.isMostrarVenta = false;
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
        this.getComprobanteVenta(idVenta);
        this.router.navigate(['./ventas']);
      });
  }

  getComprobanteVenta(idVenta: number): void {
    this.ventaService.getComprobanteVenta(idVenta).subscribe((response) => {
      const base64 = response.comprobante?.file;
      printJS({printable: base64, type: 'pdf', base64: true})
    });
  }

  crearVenta(params: IVenta): void {
      this.ventaService.insert(params).subscribe((response) => {
        const idVenta = response.idVenta;
        this.guardarDetalleVenta(idVenta);
      });
  }


  calcularVuelto(event: any): void {
    let valorAPagar = event.value;

    if (!valorAPagar || valorAPagar === 0) {
      this.vuelto?.setValue('');
    }

    if (this.totalFinal > valorAPagar) {
      this.isValorAPagarInvalid = true;
      this.vuelto?.setValue('');
      return
    }

    this.isValorAPagarInvalid = false;
    this.ventaForm.patchValue({
      vuelto: (valorAPagar - this.totalFinal)
    });
  }

  deleteItem(index: number, controls: any): void {
    this.items.removeAt(index);
    this.calcularTotal();
  }

  onChangeCantidadXTotal(controls: any, tipo: string, value?: any): void {
    let { precio, descuento, cantidad, stockActual, descuentoMaximo } = controls.value;

    if (tipo == 'cantidad') {
      value > stockActual ? cantidad = stockActual : cantidad = value;
      value == 0 ? cantidad = 1 : cantidad = value
    } else {
      value > descuentoMaximo ? descuento = descuentoMaximo : descuento = value;
    }

    if (descuento > 0) {
      controls.patchValue({
        total: (cantidad * precio) - (cantidad * descuento),
      });
    } else {
      controls.patchValue({
        total: cantidad * precio,
      });
    }
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalFinal = 0;
    this.items.controls.forEach((el: any) => {
      this.totalFinal = +el.value.total + this.totalFinal;
    });
  }

  agregarItem(event: IProductoVenta): void {
    const itemCarrito = this.fb.group({
      idDetalleVenta: [0],
      idAlmacenSucursal: [+event.idAlmacenSucursal],
      descripcion: [event.descripcion],
      precio: [+event.precioVenta],
      cantidad: [1],
      stockActual: [+event.stockActual],
      descuento: [0],
      descuentoMaximo: [+event.descuentoMaximo],
      total: [+event.precioVenta],
      idVenta: [0]
    });

    let listaItems = this.items.value;
    let itemAgregado = itemCarrito.value;
    let isAgregado = listaItems.find((res: any) => res.idAlmacenSucursal === itemAgregado.idAlmacenSucursal);
    if (!isAgregado) {
      this.items.push(itemCarrito);
    } else {
      this.items.controls.forEach((e: any) => {
        if (e.value.idAlmacenSucursal === itemAgregado.idAlmacenSucursal) {
          const { cantidad, stockActual } = e.value;

          if (cantidad >= stockActual) { return }

          e.patchValue({
            cantidad: cantidad + 1,
          });

          const nuevaCantidad = e.value.cantidad;
          const { precio } = e.value;
          e.patchValue({
            total: precio * nuevaCantidad
          });
        }
      });
    }

    this.calcularTotal();
  }

  getSerieYNumero(): void {
    this.getIdConfigDocumentoImpreso();
    this.$responseDocumentoImpreso.subscribe(response => {
      const { idConfigDocumentoImpreso, numBoleta, numTicket, numFactura, serieBoleta, serieTicket, serieFactura } = response;
      const { tipoComprobante } = this.ventaForm.value;

      this.idConfigDocumentoImpreso = idConfigDocumentoImpreso;

      const listaComprobantes: any = {
        BOLETA: { numero: numBoleta, serie: serieBoleta},
        TICKET: { numero: numTicket, serie: serieTicket},
        FACTURA: { numero: numFactura, serie: serieFactura},
      }

      const comprobanteSeleccionado = listaComprobantes[tipoComprobante.tipo];

      this.ventaForm.patchValue({
        numCompro: comprobanteSeleccionado.numero,
        serieCompro: comprobanteSeleccionado.serie,
      });
    });

  }
}
