import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IDetalleExamen } from '../../models/detalle-examen';
import { IExamen } from '../../models/examenes';
import { ExamenService } from '../../services/examen.service';
import { PlantillaExamenService } from '../../services/plantilla-examen.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';

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

  constructor(
    private fb: FormBuilder,
    private service: ExamenService,
    private servicePlantilla: PlantillaExamenService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private servicioMensajesSwal: MensajesSwalService
  ) {
    this.examenesForm = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      duracion: [null, [Validators.required]],
      elementos: this.fb.array([])
    });


  }

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Exámen';
      this.id = id;
      this.isEditar = true;
      this.buscarIdElemento();
    } else {
      this.agregarFila();
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

  get elementos(): FormArray {
    return this.examenesForm.get('elementos') as FormArray;
  }


  buscarIdElemento(): void {
    this.service.getFindById(+this.id).pipe(
      switchMap((analisis) => {
        const resultado = analisis[0];
        this.mostrarValoresInput(resultado);
        return this.servicePlantilla.getFindById(resultado.idAnalisis as number)
      })
    ).subscribe((plantilla) => {
      plantilla.forEach((item) => {
        this.agregarFila(item);
      })
    });
  }


  mostrarValoresInput(resultado: any) {
    this.examenesForm.patchValue({
      nombre: resultado.nombre,
      descripcion: resultado.descripcion,
      precio: resultado.precio,
      duracion: resultado.duracion
    });

    this.idAnalisisCreado = resultado.idAnalisis;
  }

  agregarFila(data?: IDetalleExamen): void {
    const nuevaFila = this.fb.group({
      idPlantillaAnalisis: [data?.idPlantillaAnalisis || null],
      descripcion: [data?.descripcion || null, Validators.required],
      unidad: [data?.unidad || null, Validators.required],
      valorReferencia: [data?.valorReferencia || null, Validators.required],
      estado: [true],
    });
    this.elementos.push(nuevaFila);
    return;
  }

  borrarFila(index: number) {
    this.elementos.removeAt(index);
  }

  guardar(): void {
    const { nombre, descripcion, precio, duracion } = this.examenesForm.value;

    const params: IExamen = {
      nombre,
      descripcion,
      precio,
      estado: true,
      duracion
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
        const listadoPlantilla = this.elementos.getRawValue();
        const request = listadoPlantilla.map((item) => ({
          ...item,
          idAnalisis: this.idAnalisisCreado
        }))

        return this.servicePlantilla.insert(request)
      })
    ).subscribe(() => {
      this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      this.router.navigateByUrl('/examenes');
    });
  }

  editarElemento(params: IExamen): void {
    this.service.update(+this.id, params).pipe(
      switchMap(() => {
        const listadoPlantilla = this.elementos.getRawValue();
        const request = listadoPlantilla.map((item) => ({
          ...item,
          idAnalisis: this.id
        }))

        return this.servicePlantilla.update(+this.id, request);

      })
    ).subscribe(() => {
      this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      this.router.navigateByUrl('/examenes');
    })
  }

}
