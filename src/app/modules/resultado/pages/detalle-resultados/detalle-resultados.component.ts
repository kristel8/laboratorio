import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IButton } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IDetalleAtencion } from '../../models/resultado';
import { ResultadosService } from '../../services/resultados.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';

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
  isCargado: boolean = false;
  atencionSelecionado: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private resultadosService: ResultadosService,
    private storageService: StorageService,
  ) { }

  detalleResultadoForm = this.fb.group({
    nroOrden: [{ value: null, disabled: true }],
    apellidosyNombres: [{ value: null, disabled: true }],
    fecha: [{ value: null, disabled: true }],
  });

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
          this.isCargado = true;
          this.getColumnasTabla();
          this.listaDetalleResultado = response;
        }
      });
    } else {
      this.router.navigateByUrl(`resultados`);
    }
  }

  getColumnasTabla(): void {
    this.cols = [
      { field: 'idAnalisis', header: 'ID Exámen', visibility: true, formatoFecha: '' },
      { field: 'examen', header: 'Examen', visibility: true, formatoFecha: '' },
      { field: 'fechaCreacion', header: 'Fecha de Creación', visibility: true, formatoFecha: '' },
      { field: 'fechaModificacion', header: 'Fecha de Modificación', visibility: true, formatoFecha: '' },
      { field: 'usuario', header: 'Usuario', visibility: true, formatoFecha: '' },
      { field: 'estadoAtencionAnalisis', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.agregarResultado(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  agregarResultado(data: any): void {
    this.storageService.setItem('examen-datos', data, true);
    this.router.navigateByUrl(`resultados/agregar-resultado`);
  }

  regresar(): void {
    this.storageService.removeItem('atencion-datos');
    this.router.navigateByUrl(`resultados`);
  }
}
