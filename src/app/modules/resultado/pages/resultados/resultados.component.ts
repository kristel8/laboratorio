import { Component, OnInit } from '@angular/core';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { Router } from '@angular/router';
import { IAtencionAprobadas } from '../../models/resultado';
import { ResultadosService } from '../../services/resultados.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';

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
      { field: 'fecha', header: 'Fecha', visibility: true, formatoFecha: '' },

    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  verExamenes(data: any): void {
    this.storageService.setItem('atencion-datos', data, true);
    this.router.navigateByUrl(`resultado/detalle-resultado`);
  }

  imprimir(data: any): void {

  }

  enviar(data: any): void {
    const numeroCelular = data.numeroCelular;

    this.mensajeSwalService.mensajePreguntaEnviar(numeroCelular).then((response) => {
      if (response.isConfirmed) {
        const mensaje = `Hola *${data.apellidosYNombres}*, te saludamos del Laboratorio Labsol.%0AAdjunto a este mensaje encontrarás el PDF con los resultados solicitados.%0ASi tienes alguna pregunta o necesitas información adicional, no dudes en contactarnos.%0A%0A¡Gracias por confiar en nosotros!%0ASaludos cordiales,%0A%0A*El equipo de Labsol*`
        window.open(`https://wa.me/${numeroCelular}?text=${mensaje}`, '_blank');
      }
    })
  }
}
