import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IDetalleAtencion } from '../../models/resultado';
import { ResultadosService } from '../../services/resultados.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-detalle-resultados',
  templateUrl: './detalle-resultados.component.html',
  styleUrls: ['./detalle-resultados.component.scss'],
})
export class DetalleResultadosComponent implements OnInit {
  titulo: string = 'Resultados > Exámenes';

  listaDetalleResultado: IDetalleAtencion[] = [];

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  acciones: IButton[] = [];
  isCargado: boolean = true;
  atencionSelecionado: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private resultadosService: ResultadosService,
    private storageService: StorageService,
    private mensajeSwalService: MensajesSwalService
  ) { }

  detalleResultadoForm = this.fb.group({
    nroOrden: [{ value: null, disabled: true }],
    apellidosyNombres: [{ value: null, disabled: true }],
    fecha: [{ value: null, disabled: true }],
    urocultivos: this.fb.array([]),
  });

  get urocultivos() {
    return this.detalleResultadoForm.get('urocultivos') as FormArray;
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.validateAtencionSeleccionado();


  }

  validateAtencionSeleccionado(): void {
    const seleccionado = this.atencionSelecionado = this.storageService.getItem('atencion-datos', true);

    if (seleccionado) {
      this.detalleResultadoForm.patchValue({
        nroOrden: seleccionado.idAtencion,
        apellidosyNombres: seleccionado.apellidosYNombres,
        fecha: seleccionado.fecha
      });

      this.resultadosService.getFindByIdAtencion(this.atencionSelecionado.idAtencion).subscribe((response) => {
        if (response) {
          this.isCargado = false;
          this.getColumnasTabla();
          this.listaDetalleResultado = response;
          this.cargarUrocultivos();
        }
      });
    } else {
      this.router.navigateByUrl(`resultados`);
    }
  }

  cargarUrocultivos(): void {
    this.urocultivos.clear();

    this.listaDetalleResultado.forEach((item) => {
      this.urocultivos.push(
        this.fb.group({
          resultadoUroCultivo: [item.resultadoUroCultivo]
        })
      );
    });
  }

  getColumnasTabla(): void {
    this.cols = [
      { field: 'idAnalisis', header: 'ID Exámen', visibility: true, formatoFecha: '' },
      { field: 'examen', header: 'Examen', visibility: true, formatoFecha: '' },
      { field: 'fechaCreacion', header: 'Fecha de Creación', visibility: true, formatoFecha: '' },
      { field: 'fechaModificacion', header: 'Fecha de Modificación', visibility: true, formatoFecha: '' },
      { field: 'usuario', header: 'Usuario', visibility: true, formatoFecha: '' },
      { field: 'estadoAtencionAnalisis', header: 'Estado', visibility: true, formatoFecha: '' },
      { field: 'isUroCultivo', header: 'Es Urocultivo?', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  imprimir(data: any, isFirma: number): void {
    this.resultadosService.generarReporte(data.idAtencion, isFirma).subscribe((response) => {
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

  agregarResultado(data: any, index: number): void {
    const resultadoUroCultivo = this.urocultivos.at(index).get('resultadoUroCultivo')?.value;

    let dataExamen = { ...data }

    if (data.isUroCultivo) {
      dataExamen = {
        ...data,
        resultadoUroCultivo,
        resultadoUroCultivoDescripcion:  resultadoUroCultivo === 1 ? 'POSITIVO' : 'NEGATIVO'
      }

      const requestUroCultivo = {
        resultadoUroCultivo,
        idAtencionAnalisis: data.idAtencionAnalisis
      }

      this.resultadosService.updateResultadoUrocultivo(requestUroCultivo).subscribe(() => {
        this.storageService.setItem('examen-datos', dataExamen, true);
        this.router.navigateByUrl(`resultados/agregar-resultado`);
      });
    }
  }

  regresar(): void {
    this.storageService.removeItem('atencion-datos');
    this.router.navigateByUrl(`resultados`);
  }
}
