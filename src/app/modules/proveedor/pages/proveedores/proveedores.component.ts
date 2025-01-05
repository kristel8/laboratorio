import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IProveedor } from '../../models/proveedor';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  listaElementos: IProveedor[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;
  constructor(
    private proveedorService: ProveedorService,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProveedor();
  }

  getProveedor() {
    const obs = new Observable<boolean>((observer) => {
      this.proveedorService.getProveedorActivos().subscribe((resp) => {
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
      { field: 'razonSocial', header: 'Razón Social', visibility: true, formatoFecha: '' },
      { field: 'tipoDocumento', header: 'Tipo Documento', visibility: true, formatoFecha: '' },
      { field: 'numDocumento', header: 'Nro Documento', visibility: true, formatoFecha: '' },
      { field: 'rubro', header: 'Rubro', visibility: true, formatoFecha: '' },
      { field: 'numCelular', header: 'Celular', visibility: true, formatoFecha: '' },
      { field: 'telf', header: 'Teléfono', visibility: true, formatoFecha: '' },
      { field: 'correo', header: 'Correo', visibility: true, formatoFecha: '' },
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.editarProveedor(data);
        break;

      case 'eliminar':
        this.eliminarProveedor(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  editarProveedor(data: any) {
    const idProveedor = data.idProveedor;
    this.router.navigateByUrl(`proveedores/mantenimiento-proveedor/${idProveedor}`);
  }

  eliminarProveedor(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.proveedorService
            .deleteProveedor(data.idProveedor)
            .subscribe((res) => {
              this.getProveedor();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }
}

