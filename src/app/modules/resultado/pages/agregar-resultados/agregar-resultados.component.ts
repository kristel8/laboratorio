import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ResultadosService } from '../../services/resultados.service';
import { IDetalleAnalisis, IResultadoAtencion } from '../../models/resultado';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/global/response';

@Component({
  selector: 'app-agregar-resultados',
  templateUrl: './agregar-resultados.component.html',
  styleUrls: ['./agregar-resultados.component.scss'],
})
export class AgregarResultadosComponent implements OnInit {
  isGuardar: boolean = false;
  titulo: string = 'Añadir Resultados';
  id!: string;
  isEditar: boolean = false;

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];

  loading = false;

  listaDetalleExamenes: any[] = [];

  atencionSelecionado: any;
  examenSeleccionado: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private resultadosService: ResultadosService,
    private storageService: StorageService
  ) { }

  agregarResultadoForm = this.fb.group({
    nroOrden: [{ value: null, disabled: true }],
    apellidosyNombres: [{ value: null, disabled: true }],
    examen: [{ value: null, disabled: true }],
    fecha: [{ value: null, disabled: true }],
    elementos: this.fb.array([])
  });

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.validateAtencionSeleccionado();
    this.loading = true;
    this.resultadosService.getFindByIdAnalisis(this.examenSeleccionado.idAtencionAnalisis).subscribe((response) => {
      if (response) {
        this.loading = false;
        this.getColumnasTabla();
        this.listaDetalleExamenes = response;

        this.listaDetalleExamenes.forEach((item) => {
          this.agregarFila(item);
        })
      }
    })
  }

  agregarFila(data?: IDetalleAnalisis): void {
    const nuevaFila = this.fb.group({
      idResultadoAtencion: [data?.idResultadoAtencion],
      idPlantillaAnalisis: [data?.idPlantillaAnalisis],
      descripcion: [data?.descripcion],
      resultado: [data?.resultado || null, Validators.required],
      unidad: [data?.unidad],
      valorReferencial: [data?.valorReferencial],
      idAtencionAnalisis: [data?.idAtencionAnalisis],
    });

    this.elementos.push(nuevaFila);
    return;
  }

  validateAtencionSeleccionado(): void {
    const seleccionadoAtencion = this.atencionSelecionado = this.storageService.getItem('atencion-datos', true);
    const seleccionadoExamen = this.examenSeleccionado = this.storageService.getItem('examen-datos', true);
    this.isEditar = seleccionadoExamen.estadoAtencionAnalisis === 'COMPLETADO';

    if (seleccionadoAtencion && seleccionadoExamen) {
      this.agregarResultadoForm.patchValue({
        nroOrden: seleccionadoAtencion.idAtencion,
        apellidosyNombres: seleccionadoAtencion.apellidosYNombres,
        fecha: seleccionadoExamen.fechaModificacion,
        examen: seleccionadoExamen.examen
      })
    } else {
      this.router.navigateByUrl(`resultado`);
    }
  }


  get elementos(): FormArray {
    return this.agregarResultadoForm.get('elementos') as FormArray;
  }

  getColumnasTabla(): void {
    this.cols = [
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'resultado', header: 'Resultado', visibility: true, formatoFecha: '' },
      { field: 'unidad', header: 'Unidad', visibility: true, formatoFecha: '' },
      { field: 'valorReferencial', header: 'Valor referencial', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  guardar(): void {
    const listExamenes = this.elementos.getRawValue();
    let listRequest: IResultadoAtencion[] = [];

    listExamenes.forEach((item) => {
      listRequest.push({
        idResultadoAtencion: item.idResultadoAtencion ?? 0,
        idPlantillaAnalisis: item.idPlantillaAnalisis,
        resultado: item.resultado,
        idAtencionAnalisis: item.idAtencionAnalisis
      })
    });

    this.insertOrUpdateElemento(listRequest).subscribe((response) => {
      if (response) {
        this.storageService.removeItem('atencion-datos');
        this.storageService.removeItem('examen-datos');
        this.router.navigateByUrl('/resultado');
      }
    });
  }

  insertOrUpdateElemento(params: IResultadoAtencion[]): Observable<IResponse> {
    if (this.isEditar) {
      return this.resultadosService.insert(params);
    } else {
      return this.resultadosService.update(params);
    }
  }

  regresar(): void {
    this.storageService.removeItem('examen-datos');
    this.router.navigateByUrl('/resultado/detalle-resultado');
  }
}
