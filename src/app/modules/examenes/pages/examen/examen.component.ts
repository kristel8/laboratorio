import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IExamen } from '../../models/examenes';
import { Router } from '@angular/router';
import { ExamenService } from '../../services/examen.service';
import { Observable } from 'rxjs';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IButton } from 'src/app/shared/components/table/models/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss'],
})
export class ExamenComponent implements OnInit {
  listaElementos: IExamen[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  acciones: IButton[] = [];
  isCargado: boolean = false;
  isOpenView: boolean = false;
  pdfSrc: SafeResourceUrl | null = null;

  constructor(
    private router: Router,
    private service: ExamenService,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getAllActivosElementos();

    this.acciones = [
      {
        icono: 'pi pi-eye',
        clase: 'rounded-success',
        evento: 'ver',
        estado: true,
        tooltip: 'Ver plantilla'
      },
      {
        icono: 'pi pi-pencil',
        clase: 'rounded',
        evento: 'editar',
        estado: true,
        tooltip: 'Editar'
      },
      {
        icono: 'pi pi-trash',
        clase: 'rounded-danger',
        evento: 'eliminar',
        estado: true,
        tooltip: 'Eliminar'
      },
    ]
  }


  getColumnasTabla(): void {
    this.cols = [
      { field: 'idAnalisis', header: 'ID Examen', visibility: true, formatoFecha: '' },
      { field: 'nombre', header: 'Nombre', visibility: true, formatoFecha: '' },
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'precio', header: 'Precio', visibility: true, formatoFecha: '' },
      { field: 'duracion', header: 'Tiempo a Entregar', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  getAllActivosElementos() {
    const obs = new Observable<boolean>((observer) => {
      this.service.getAllActivos().subscribe((resp) => {
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
          this.service.setInactive(data.idAnalisis).subscribe((res) => {
            this.getAllActivosElementos();
            this.servicioMensajesSwal.mensajeRegistroEliminado();
          });
        }
      });
  }



  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'ver':
        this.verExamen(data);
        break;

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
    const id = data.idAnalisis;
    this.router.navigateByUrl(`examenes/mantenimiento-examen/${id}`);
  }

  convertBase64ToBlobUrl(base64: string): string {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    return URL.createObjectURL(blob);
  }

  sanitizePdfUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + '#toolbar=0');
  }

  verExamen(data: any): void {
    this.service.generarExamenPlantilla(data.idAnalisis).subscribe((response) => {
      if (response) {
        this.isOpenView = true;
        this.pdfSrc = this.sanitizePdfUrl(this.convertBase64ToBlobUrl(response.file));
      }
    })

  }
}
