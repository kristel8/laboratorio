import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { ICompra, IListaCompra } from '../../models/compra';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  listaElementos: IListaCompra[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;
  acciones: IButton[] = [];

  constructor(
    private compraService: CompraService,
    private router: Router,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  ngOnInit(): void {
    this.getCompras();

    this.acciones = [
      {
        icono: 'pi pi-check',
        clase: 'outlined-rounded-success',
        evento: 'recepcionar',
        estado: true,
        tooltip: 'Recepcionar'
      },
      {
        icono: 'pi pi-times',
        clase: 'outlined-rounded-danger',
        evento: 'rechazar',
        estado: true,
        tooltip: 'Rechazar'
      }
    ]
  }


  getCompras() {
    const obs = new Observable<boolean>((observer) => {
      this.compraService.getCompraActivos().subscribe((resp) => {
        this.listaElementos = resp;
        console.log(this.listaElementos)
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
      { field: 'empresa', subField: 'razonSocial', header: 'Razón Social', visibility: true, formatoFecha: '' },
      { field: 'tipoCompro', header: 'Tipo Comprobante', visibility: true, formatoFecha: '' },
      { field: 'serieCompro', header: 'Serie', visibility: true, formatoFecha: '' },
      { field: 'numCompro', header: 'Nro Comprobante', visibility: true, formatoFecha: '' },
      { field: 'asunto', header: 'Asunto', visibility: true, formatoFecha: '' },
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'totalCompra', header: 'Total Compra', visibility: true, formatoFecha: '' },
      { field: 'fechaRegistro', header: 'Fecha', visibility: true, formatoFecha: '' },
      { field: 'estadoCompra', header: 'Estado Compra', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    console.log(datos)
    const { tipo, data, evento } = datos;
    switch (tipo) {
      case 'editar':
        this.editarCompra(data);
        break;

      case 'eliminar':
        this.eliminarCompra(data);
        break;

      case 'recepcionar':
        this.recepcionarCompra(data, evento);
        break;

      case 'rechazar':
        this.rechazarCompra(data, evento);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  editarCompra(data: any) {
    const idCompra = data.idCompra;
    this.router.navigateByUrl(`compras/mantenimiento-compra/${idCompra}`);
  }

  eliminarCompra(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.compraService
            .deleteCompra(data.idCompra)
            .subscribe((res) => {
              this.getCompras();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }

  recepcionarCompra(data: any,  evento: any) {
    const idCompra = data.idCompra;
    this.compraService.setReceivedCompra(idCompra).subscribe(res => {
      console.log(res);
      this.getCompras();
    })
  }

  rechazarCompra(data: any, evento: any) {
    const idCompra = data.idCompra;
    this.compraService.setCanceledCompra(idCompra).subscribe(res => {
      console.log(res);
      this.getCompras();
    })
  }

}
