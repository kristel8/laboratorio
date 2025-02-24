import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { Router } from '@angular/router';
import { IAtencionAprobadas } from '../../models/resultado';
import { ResultadosService } from '../../services/resultados.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  listaAtenciones: IAtencionAprobadas[] = [];

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;

  constructor(
    private router: Router,
    private resultadoService: ResultadosService,
    private storageService: StorageService,
    private mensajeSwalService: MensajesSwalService
  ) { }

  ngOnInit(): void {
    this.storageService.removeItem('atencion-datos');
    this.storageService.removeItem('examen-datos');
    this.getItems();
  }

  getItems(): void {
    this.isCargado = true;

    this.resultadoService.getAtencionAprobadas().subscribe((response) => {
      if (response) {
        this.isCargado = false;
        this.getColumnasTabla();
        this.listaAtenciones = response;
      }
    })
  }

  getColumnasTabla(): void {
    this.cols = [
      { field: 'idAtencion', header: 'Nro° Atención', visibility: true, formatoFecha: '' },
      {
        field: 'apellidosYNombres',
        header: 'Apellidos y Nombres',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'usuario',
        header: 'Usuario',
        visibility: true,
        formatoFecha: '',
      },
      { field: 'estadoOrden', header: 'Estado', visibility: true, formatoFecha: '' },
      { field: 'fecha', header: 'Fecha', visibility: true, formatoFecha: '' },

    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  verExamenes(data: any): void {
    this.storageService.setItem('atencion-datos', data, true);
    this.router.navigateByUrl(`resultados/detalle-resultado`);
  }

  imprimir(data: any, isFirma: number): void {
    this.resultadoService.generarReporte(data.idAtencion, isFirma).subscribe((response) => {
      if (isFirma) {
        this.enviar(data, response)
      } else {
        const base64 = response.file as string;
        printJS({
          printable: base64,
          type: 'pdf',
          base64: true,
          showModal: false,
          onPrintDialogClose: () => {
            console.log("Impresión finalizada");
          }
        });
      }
    })
  }

  downloadPdf(base64String: string, fileName: string) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const fileBlob = new Blob([byteArray], { type: 'application/pdf' });

    const fileURL = URL.createObjectURL(fileBlob);
    const a = document.createElement('a');
    a.href = fileURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(fileURL);
  }

  enviar(data: any, info: any): void {
    const numeroCelular = data.numeroCelular;

    if (numeroCelular) {
      this.mensajeSwalService.mensajePreguntaEnviar(numeroCelular).then((response) => {
        if (response.isConfirmed) {
          this.downloadPdf(info.file, info.fileName);
          const mensaje = `Hola *${data.apellidosYNombres}*, te saludamos de Laboratorios LAB SOL.%0AAdjunto el presente el PDF con los resultados correspondientes, si tiene alguna pregunta o necesita información adicional, no dudes en contactarnos.%0A%0AEsperamos su pronta mejora.%0A%0A¡Gracias por confiar en nosotros!%0A%0A*EQUIPO LABSOL*`
          window.open(`https://wa.me/${numeroCelular}?text=${mensaje}`, '_blank');
        }
      });
    } else {
      this.mensajeSwalService.mensajePregunta('¿Ejecutamos la descarga de los resultados con firma? El paciente no cuenta con número de celular').then((response) => {
        if (response.isConfirmed) {
          this.downloadPdf(info.file, info.fileName);
        }
      });
    }

  }
}
