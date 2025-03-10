import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IDetalleExamen } from '../../models/detalle-examen';
import { IExamen } from '../../models/examenes';
import { ExamenService } from '../../services/examen.service';
import { PlantillaExamenService } from '../../services/plantilla-examen.service';
import { TIPO_UROCULTIVO } from 'src/app/global/constantes';

@Component({
  selector: 'app-mantenimiento-examen',
  templateUrl: './mantenimiento-examen.component.html',
  styleUrls: ['./mantenimiento-examen.component.scss']
})
export class MantenimientoExamenComponent implements OnInit {
  isGuardar: boolean = false;
  titulo: string = 'Crear Exámen';
  id!: string;
  isEditar: boolean = false;

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];

  examenesForm: FormGroup;

  idAnalisisCreado!: number;

  menuOptions!: any[];
  menuControl = new FormControl(TIPO_UROCULTIVO.Positivo);
  menu = TIPO_UROCULTIVO;

  constructor(
    private fb: FormBuilder,
    private service: ExamenService,
    private servicePlantilla: PlantillaExamenService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private servicioMensajesSwal: MensajesSwalService,
    private cdRef: ChangeDetectorRef
  ) {
    this.examenesForm = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      duracion: [null, [Validators.required]],
      isUroCultivo: [false],
      elementos: this.fb.array([]),
      positivos: this.fb.array([]),
      negativos: this.fb.array([]),
    });


  }

  ngOnInit(): void {
    this.menuOptions = [
      { name: 'Plantilla Positivo', value: TIPO_UROCULTIVO.Positivo },
      { name: 'Plantilla Negativo', value: TIPO_UROCULTIVO.Negativo },
    ];

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Exámen';
      this.id = id;
      this.isEditar = true;
      this.buscarIdElemento();
    } else {
      this.agregarFila(undefined, 0);
      if (this.isUroCultivo?.value) {
        this.agregarFila(undefined, 1);
        this.agregarFila(undefined, 2);
      }
    }
  }


  get nombre() {
    return this.examenesForm.get('nombre');
  }

  get descripcion() {
    return this.examenesForm.get('descripcion');
  }

  get precio() {
    return this.examenesForm.get('precio');
  }

  get duracion() {
    return this.examenesForm.get('duracion');
  }

  get isUroCultivo() {
    return this.examenesForm.get('isUroCultivo');
  }

  get elementos(): FormArray {
    return this.examenesForm.get('elementos') as FormArray;
  }

  get positivos(): FormArray {
    return this.examenesForm.get('positivos') as FormArray;
  }

  get negativos(): FormArray {
    return this.examenesForm.get('negativos') as FormArray;
  }

  loadPlantillaUrocultivo(): void {
    if (this.isUroCultivo?.value) {
      this.elementos.clear();
      this.agregarFila(undefined, 1);
      this.agregarFila(undefined, 2);
    } else {
      this.positivos.clear();
      this.negativos.clear();
      this.agregarFila(undefined, 0);
    }
  }

  updateRowState(index: number, tipo?: number) {
    this.cdRef.detectChanges();

    const control = tipo === 1 ? this.positivos : tipo === 2 ? this.negativos : this.elementos;
    const row = control.at(index);
    const isSubtitulo = row.get('isSubtitulo')?.value;

    if (isSubtitulo) {
      if (row.get('unidad')?.value || row.get('valorReferencia')?.value) {
        this.servicioMensajesSwal.mensajePregunta('Los campos UNIDAD y VALOR REFERENCIA se borrarán, está seguro de continuar?').then(
          (response) => {
            if (response.isConfirmed) {
              row.get('unidad')?.disable();
              row.get('valorReferencia')?.disable();

              row.get('unidad')?.reset();
              row.get('valorReferencia')?.reset();
            } else {
              row.get('isSubtitulo')?.setValue(false);
            }
          }
        )
      } else {
        row.get('unidad')?.disable();
        row.get('valorReferencia')?.disable();
      }
    } else {
      row.get('unidad')?.enable();
      row.get('valorReferencia')?.enable();
    }
  }

  buscarIdElemento(): void {
    this.service.getFindById(+this.id).pipe(
      switchMap((analisis) => {
        const resultado = analisis[0];
        this.mostrarValoresInput(resultado);
        return this.servicePlantilla.getFindById(resultado.idAnalisis as number)
      })
    ).subscribe((plantilla) => {
      const plantillaPositivo = plantilla.filter((item) => item.tipoUroCultivo === 1);
      const plantillaNegativo = plantilla.filter((item) => item.tipoUroCultivo === 2);
      const plantillaNormal = plantilla.filter((item) => item.tipoUroCultivo === 0);
      if (plantillaPositivo) {
        plantillaPositivo.forEach((item, index) => {
          this.agregarFila(item, 1);
          this.updateRowState(index, 1);
        });
      }

      if (plantillaNegativo) {
        plantillaNegativo.forEach((item, index) => {
          this.agregarFila(item, 2);
          this.updateRowState(index, 2);
        });
      }

      if (plantillaNormal) {
        plantillaNormal.forEach((item, index) => {
          this.agregarFila(item, 0);
          this.updateRowState(index);
        });
      }
    });
  }


  mostrarValoresInput(resultado: any) {
    this.examenesForm.patchValue({
      nombre: resultado.nombre,
      descripcion: resultado.descripcion,
      precio: resultado.precio,
      duracion: resultado.duracion,
      isUroCultivo: resultado.isUroCultivo
    });

    this.idAnalisisCreado = resultado.idAnalisis;
  }

  agregarFila(data?: IDetalleExamen, tipo?: number): void {
    const nuevaFila = this.fb.group({
      isSubtitulo: [data?.isSubtitulo || false],
      idPlantillaAnalisis: [data?.idPlantillaAnalisis || null],
      descripcion: [data?.descripcion || null, Validators.required],
      unidad: [data?.unidad || ''],
      valorReferencia: [data?.valorReferencia || ''],
      estado: [true],
      tipoUroCultivo: [data?.tipoUroCultivo || tipo]
    });

    switch (tipo) {
      case 1:
        this.positivos.push(nuevaFila);
        break;

      case 2:
        this.negativos.push(nuevaFila);
        break;

      default:
        this.elementos.push(nuevaFila);
        break;
    }

    return;
  }

  borrarFila(index: number, tipo?: number) {
    switch (tipo) {
      case 1:
        this.positivos.removeAt(index);
        break;

      case 2:
        this.negativos.removeAt(index);
        break;

      default:
        this.elementos.removeAt(index);
        break;
    }
  }

  guardar(): void {
    const { nombre, descripcion, precio, duracion, isUroCultivo } = this.examenesForm.value;

    const params: IExamen = {
      nombre,
      descripcion,
      precio,
      estado: true,
      duracion,
      isUroCultivo
    };

    if (this.isEditar) {
      this.editarElemento(params);
      return;
    } else {
      this.crearElemento(params);
      return;
    }
  }

  crearElemento(params: IExamen): void {
    this.service.insert(params).pipe(
      switchMap((response) => {
        this.idAnalisisCreado = response.idGenerado;

        const listadoPlantilla = [
          ...this.elementos.getRawValue(),
          ...this.positivos.getRawValue(),
          ...this.negativos.getRawValue(),
        ]

        const request = listadoPlantilla.map((item) => ({
          ...item,
          idAnalisis: this.idAnalisisCreado
        }))

        return this.servicePlantilla.insert(request)
      })
    ).subscribe((response) => {
      if (response) {
        this.router.navigateByUrl('/examenes');
      }
    });
  }

  editarElemento(params: IExamen): void {
    this.service.update(+this.id, params).pipe(
      switchMap(() => {
        const listadoPlantilla = [
          ...this.elementos.getRawValue(),
          ...this.positivos.getRawValue(),
          ...this.negativos.getRawValue(),
        ]

        const request = listadoPlantilla.map((item) => ({
          ...item,
          idAnalisis: this.id
        }))

        return this.servicePlantilla.update(+this.id, request);

      })
    ).subscribe((response) => {
      if (response) this.router.navigateByUrl('/examenes');
    })
  }

}
