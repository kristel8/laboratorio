import { Component, OnInit } from '@angular/core';
import { ITable, ITableCaption, ITableHeader } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IConfigDocumentoImpreso } from '../../models/configDocumentoImpreso';
import { ConfigDocumentoImpresoService } from '../../services/config-documento-impreso.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-config-documento-impreso',
  templateUrl: './config-documento-impreso.component.html',
  styleUrls: ['./config-documento-impreso.component.scss']
})
export class ConfigDocumentoImpresoComponent implements OnInit {


  listaConfigDocumentoImpreso: IConfigDocumentoImpreso[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];

  propiedadesTabla!: ITable;
  propiedadesCaption!: ITableCaption;
  propiedadesHeader!: ITableHeader;

  isCargado: boolean = false;

  constructor(
    private configDocumentoImpresoService : ConfigDocumentoImpresoService,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getConfigDocumentoImpreso();

  }


  getConfigDocumentoImpreso() {
    const obs = new Observable<boolean>((observer) => {
      this.configDocumentoImpresoService.getConfigDocumentoImpresosActivos().subscribe((resp) => {
        this.listaConfigDocumentoImpreso = resp;
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

      {  field: 'tituloConfiguracion',  header: 'Titulo Configuracion',  visibility: true,  formatoFecha: '' },

      { field: 'nombreEmpresa', header: 'Nombre Empresa', visibility: true, formatoFecha: '' },
      { field: 'rucDocumento', header: 'RUC Documento', visibility: true, formatoFecha: '' },
      { field: 'direccion', header: 'Dirección', visibility: true, formatoFecha: '' },
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'serieBoleta', header: 'Serie Boleta', visibility: true, formatoFecha: '' },
      { field: 'numBoleta', header: 'Numero Boleta', visibility: true, formatoFecha: '' },
      { field: 'serieTicket', header: 'Serie Ticket', visibility: true, formatoFecha: '' },
      { field: 'numTicket', header: 'Numero Ticket', visibility: true, formatoFecha: '' },
      { field: 'serieFactura', header: 'Serie Factura', visibility: true, formatoFecha: '' },
      { field: 'numFactura', header: 'Numero Factura', visibility: true, formatoFecha: '' },

      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }


  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.editarConfigDocumentoImpreso(data);
        break;

      case 'eliminar':
        this.eliminarConfigDocumentoImpreso(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  editarConfigDocumentoImpreso(data: any) {
    const idConfigDocumentoImpreso = data.idConfigDocumentoImpreso;
    this.router.navigateByUrl(`config-documento-impresos/mantenimiento-config-documento-impreso/${idConfigDocumentoImpreso}`);
  }



  eliminarConfigDocumentoImpreso(data: any) {

    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.configDocumentoImpresoService
            .deleteConfigDocumentoImpresos(data.idConfigDocumentoImpreso)
            .subscribe((res) => {
              this.getConfigDocumentoImpreso();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }

}
