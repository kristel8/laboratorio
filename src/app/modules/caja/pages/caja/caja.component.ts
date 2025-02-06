import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { ICaja } from '../../models/caja';
import { IButton } from 'src/app/shared/components/table/models/table';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CajaService } from '../../services/caja.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss'],
})
export class CajaComponent implements OnInit {
  tituloModal!: string;
  listaCaja: ICaja[] = [];

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];

  colsPagar: IColumnasTabla[] = [];
  colsPagarVisibles: IColumnasTabla[] = [];

  listaExamenes: any[] = [];
  tipoMedioDePago: any[] = [];

  isCargado: boolean = true;

  acciones: IButton[] = [];

  isOpenModal: boolean = false;

  subscriptions: Subscription[] = [];

  nombreBotonAPagar!: string;

  totalLista: number = 0;

  constructor(
    private fb: FormBuilder,
    private cajaService: CajaService,
    private readonly formatoFecha: DatePipe,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private currencyPipe: CurrencyPipe
  ) { }

  cajaBuscadorForm = this.fb.group({
    fecha: [new Date()],
    medioPago: [null],
  });

  cajaForm = this.fb.group({
    idPago: [null],
    fechaEmision: [null],
    subTotal: [null],
    fechaPago: [null],
    idAtencion: [null],
    tipoPago: [null, Validators.required],
    descuentoTotal: [0],
    total: [null],
    acuenta: [0],
  });

  options: any[] = [
    { icon: 'efectivo', value: 'efectivo' },
    { icon: 'yape', value: 'yape' },
    { icon: 'plin', value: 'plin' },
    { icon: 'pos', value: 'pos' },
  ];

  get fecha(): AbstractControl {
    return this.cajaBuscadorForm.get('fecha') as AbstractControl;
  }

  get medioPago() {
    return this.cajaBuscadorForm.get('medioPago');
  }

  get idPago(): AbstractControl {
    return this.cajaForm.get('idPago') as AbstractControl;
  }

  get subTotal(): AbstractControl {
    return this.cajaForm.get('subTotal') as AbstractControl;
  }

  get descuentoTotal(): AbstractControl {
    return this.cajaForm.get('descuentoTotal') as AbstractControl;
  }

  get acuenta(): AbstractControl {
    return this.cajaForm.get('acuenta') as AbstractControl;
  }

  get tipoPago(): AbstractControl {
    return this.cajaForm.get('tipoPago') as AbstractControl;
  }

  get total(): AbstractControl {
    return this.cajaForm.get('total') as AbstractControl;
  }



  ngOnInit(): void {
    this.listarDropdown();
    this.getColumnasTabla();

    this.acciones = [
      {
        icono: 'pi pi-money-bill',
        clase: 'rounded',
        evento: 'pagar',
        estado: true,
        tooltip: 'Pagar'
      },
      {
        icono: 'pi pi-print',
        clase: 'rounded-help',
        evento: 'imprimir',
        estado: true,
        tooltip: 'Imprimir ticket'
      },
    ];

    this.buscar();

    // this.descuentoTotal.valueChanges.pipe(
    //   startWith(this.descuentoTotal.value),
    //   distinctUntilChanged()
    // ).subscribe((descuento) => {
    //   if (descuento) {
    //     this.descuento();
    //   }
    // });
  }

  listarDropdown(): void {
    this.tipoMedioDePago = [
      {
        tipo: 'efectivo',
        nombre: 'EFECTIVO',
      },
      {
        tipo: 'yape',
        nombre: 'YAPE',
      },
      {
        tipo: 'plin',
        nombre: 'PLIN',
      },
      {
        tipo: 'pos',
        nombre: 'POS',
      },
    ]

  }

  getColumnasTabla(): void {
    this.cols = [
      { field: 'idAtencion', header: 'Nro Atención', visibility: true, formatoFecha: '' },
      { field: 'apellidoYNombres', header: 'Apellidos y Nombres', visibility: true, formatoFecha: '' },
      { field: 'fechaEmision', header: 'Fecha Emisión', visibility: true, formatoFecha: '' },
      { field: 'fechaPago', header: 'Fecha Pago', visibility: true, formatoFecha: '' },
      { field: 'tipoPago', header: 'Medio Pago', visibility: true, formatoFecha: '' },
      { field: 'total', header: 'Total', visibility: true, formatoFecha: '' },
      { field: 'estadoPago', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsPagar = [
      { field: 'nombre', header: 'Exámenes', visibility: true, formatoFecha: '' },
      { field: 'precio', header: 'Precio', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
    this.colsPagarVisibles = this.colsPagar.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'pagar':
        this.openModalPagar(data)
        break;

      case 'imprimir':
        this.imprimirTicket(data.idPago)
        break;

    }
  }

  buscar(): void {
    if (this.fecha.value) {
      this.getAllActivos().subscribe((response) => {
        if (response) {
          this.isCargado = true;

          if (this.medioPago?.value) {
            this.listaCaja = response.filter((item) => item.tipoPago === this.medioPago?.value.tipo);
            this.totalLista = response.reduce((acc, item) => acc + item.total, 0)
            return;
          }

          this.listaCaja = response;

          this.totalLista = response.reduce((acc, item) => acc + item.total, 0)
        }
      })
    }
  }

  getAllActivos(): Observable<ICaja[]> {
    const fechaTransformada = this.formatoFecha.transform(this.fecha?.value, 'yyyy-MM-dd')!;
    return this.cajaService.getAllActivos(fechaTransformada)
  }

  limpiar(): void {
    this.fecha.setValue(new Date());
    this.medioPago?.reset();
  }

  openModalPagar(data: ICaja): void {
    if (data.estadoPago === 'PAGADO') {
      return this.servicioMensajesSwal.mensajeAdvertencia('La atención ya ha sido pagada.');
    }

    this.cajaService.getDetalle(data.idAtencion).subscribe((response) => {
      if (response) {
        this.tituloModal = `Pagar Orden: ${data.idAtencion}`
        this.isOpenModal = true;
        this.listaExamenes = response;
        console.log(data);

        if (data.estadoPago === 'PENDIENTE') {
          this.descuentoTotal.reset();
          this.acuenta.reset();

          this.subTotal.setValue(response.reduce((acc, item) => acc + item.precio, 0));
          this.total.setValue(this.subTotal.value);
          this.cajaForm.patchValue({
            idPago: data.idPago,
            fechaEmision: data.fechaEmision,
            fechaPago: data.fechaPago,
            idAtencion: data.idAtencion,
          });

        } else {
          if (data.acuenta) this.acuenta.disable();
          if (data.acuenta || data.descuentoTotal) this.descuentoTotal.disable();

          console.log(data);

          this.cajaForm.patchValue({
            idPago: data.idPago,
            fechaEmision: data.fechaEmision,
            subTotal: data.subTotal,
            fechaPago: data.fechaPago,
            idAtencion: data.idAtencion,
            tipoPago: data.tipoPago,
            descuentoTotal: data.descuentoTotal,
            total: data.total,
            acuenta: data.acuenta
          });
        }
      }
    })
  }


  descuento(): void {
    this.total.setValue(this.subTotal.value - this.descuentoTotal.value);
  }

  pagar(): void {
    this.acuenta.setValue(0);
    this.descuentoTotal.setValue(0);

    this.cajaService.pagar(this.cajaForm.getRawValue()).subscribe((response) => {
      console.log(response);
      this.isOpenModal = false;
      this.buscar();
      this.imprimirTicket(this.idPago.value);
    })
  }

  getPagoLabel(): string {
    const total = this.total.value;
    const acuenta = this.acuenta.value;

    this.cajaForm.updateValueAndValidity();
    if (acuenta && this.acuenta.disabled) {
      return `Pagar ${this.currencyPipe.transform(total - acuenta, 'S/')}`;
    }

    if (acuenta) {
      return `Pagar ${this.currencyPipe.transform(acuenta, 'S/')}`;
    }

    return `Pagar ${this.currencyPipe.transform(total, 'S/')}`;
  }

  imprimirTicket(id: number): void {
    this.cajaService.generarTicket(id).subscribe((response) => {
      console.log(response);
      const base64 = response.data[0].file as string;
      printJS({
        printable: base64,
        type: 'pdf',
        base64: true,
        showModal: false, // Evita mostrar la ventana de carga
        onPrintDialogClose: () => {
          console.log("Impresión finalizada");
        }
      });
    });
  }
}
