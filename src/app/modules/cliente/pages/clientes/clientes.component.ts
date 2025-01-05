import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { ICliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  listaElementos: ICliente[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllActivosElementos();
  }

  getColumnasTabla() {
    this.cols = [
      { field: 'tipoCliente', header: 'Tipo de Cliente', visibility: true, formatoFecha: '' },
      { field: 'tipoDocumento', header: 'Tipo de Documento', visibility: true, formatoFecha: '' },
      { field: 'numDocumento', header: 'Número de Documento', visibility: true, formatoFecha: '' },
      { field: 'razonSocial', header: 'Razón Social', visibility: true, formatoFecha: '' },
      { field: 'nombre', header: 'Nombres', visibility: true, formatoFecha: '' },
      { field: 'apellido', header: 'Apellidos', visibility: true, formatoFecha: '' },
      { field: 'fecNac', header: 'Fecha Nacimiento', visibility: true, formatoFecha: '' },
      { field: 'numCel', header: 'Celular', visibility: true, formatoFecha: '' },
      { field: 'correo', header: 'Correo', visibility: true, formatoFecha: '' },
      { field: 'direccion', header: 'Dirección', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  getAllActivosElementos() {
    const obs = new Observable<boolean>((observer) => {
      this.clienteService.getAllActivos().subscribe((resp) => {
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

  eliminarElemento(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.clienteService
            .setInactive(data.idCliente)
            .subscribe((res) => {
              this.getAllActivosElementos();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.editarElemento(data);
        break;

      case 'eliminar':
        this.eliminarElemento(data);
        break;


      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  editarElemento(data: any) {
    const id = data.idCliente;
    this.router.navigateByUrl(`clientes/mantenimiento-cliente/${id}`);
  }
}
