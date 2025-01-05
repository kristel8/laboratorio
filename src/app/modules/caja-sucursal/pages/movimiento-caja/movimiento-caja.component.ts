import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IMovimientoCaja, IMovimientosCaja } from '../../models/movimiento-caja.interface';
import { CajaSucursalService } from '../../services/caja-sucursal.service';

@Component({
  selector: 'app-movimiento-caja',
  templateUrl: './movimiento-caja.component.html',
  styleUrls: ['./movimiento-caja.component.scss']
})
export class MovimientoCajaComponent implements OnInit {

  titulo: string = 'Movimiento Caja';
  listaTipoMovimiento = [{ tipo: 'ENTRADA' }, { tipo: 'SALIDA' }]
  minCantidad: number = 0;
  maxCantidad: number = 999999;

  listaElementos: IMovimientosCaja[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;
  acciones: IButton[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cajaService: CajaSucursalService,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  ngOnInit(): void {
    this.getMovimientos();
  }

  cajaForm = this.fb.group({
    tipoMovimiento: ['ENTRADA', [Validators.required]],
    descripcion: [null],
    cantidad: [null, [Validators.required]],
  });

  get tipoMovimiento() {
    return this.cajaForm.get('tipoMovimiento');
  }

  get descripcion() {
    return this.cajaForm.get('descripcion');
  }

  get cantidad() {
    return this.cajaForm.get('cantidad');
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'eliminar':
        this.eliminarMovimiento(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  onChangeTipoDeMovimiento(event: any): void {
    this.cantidad?.reset();
    console.log(event)

    if (event.value === 'SALIDA') {
      this.minCantidad = -999999;
      this.maxCantidad = -1;
    } else {
      this.minCantidad = 1;
      this.maxCantidad = 999999;
    }
  }

  guardarMovimiento(event: any): void {

    const { tipoMovimiento, descripcion, cantidad } = this.cajaForm.value;
    const paramsCabecera: IMovimientoCaja = {
      tipoMovimiento: tipoMovimiento,
      cantidad: cantidad,
      descripcion: descripcion,
      idCaja: +this.authService.usuario.idCaja,
      idmovimientocaja: 0
    }

    this.cajaService.insert(paramsCabecera).subscribe((response => {
      this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      this.getMovimientos();
      this.cantidad?.reset();
      this.descripcion?.reset();
    }));

  }

  getMovimientos(): void {
    const { idCaja } = this.authService.usuario;
    const obs = new Observable<boolean>((observer) => {
      this.cajaService.getByIdCaja(+idCaja).subscribe((response => {
        console.log(response);
        this.listaElementos = response;
        observer.next(true);
      }));
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
      { field: 'tipoMovimiento', header: 'Tipo de movimiento', visibility: true, formatoFecha: '' },
      { field: 'cantidad', header: 'cantidad', visibility: true, formatoFecha: '' },
      { field: 'fecha', header: 'Fecha', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eliminarMovimiento(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.cajaService
            .delete(+data.idMovimientoCaja)
            .subscribe((res) => {
              this.getMovimientos();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }
}
