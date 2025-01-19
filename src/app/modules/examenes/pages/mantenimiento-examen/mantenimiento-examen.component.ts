import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamenService } from '../../services/examen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IDetalleExamen } from '../../models/detalle-examen';
import { IExamen } from '../../models/examenes';
import { PlantillaExamenService } from '../../services/plantilla-examen.service';

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
  listaElementos: IDetalleExamen[] = [];

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
  ) {
    this.examenesForm = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      elementos: this.fb.array([]) // Inicializar FormArray vacío
    });

  }

  ngOnInit(): void {

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Empleado';
      this.id = id;
      this.isEditar = true;
      this.buscarIdElemento();
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

  get elementos(): FormArray {
    return this.examenesForm.get('elementos') as FormArray;
  }


  buscarIdElemento() {
    this.service.getFindById(+this.id).subscribe((res) => {
      const resultado = res[0];
      this.mostrarValoresInput(resultado);
    });
  }


  mostrarValoresInput(resultado: any) {
    this.examenesForm.patchValue({
      nombre: resultado.nombre,
      descripcion: resultado.descripcion,
      precio: resultado.precio
    });
  }
  // Otras funciones como buscarIdElemento, agregarFila, borrarFila, etc.
  agregarFila(): void {
    const nuevaFila = this.fb.group({
      descripcion: [null, Validators.required],
      unidad: [null, Validators.required],
      valorReferencial: [null, Validators.required],
      estado: [true]
    });
    this.elementos.push(nuevaFila);
    console.log('Elementos:', this.elementos.value); // Verificar estructura
  }

  borrarFila(index: number) {
    this.elementos.removeAt(index);
  }

  guardar(): void {
    if (this.idAnalisisCreado) {
      const listadoPlantilla = this.elementos.getRawValue();

      listadoPlantilla.map((item) => ({
        ...item,
        idAnalisis: this.idAnalisisCreado
      }))
      this.servicePlantilla.insert(listadoPlantilla).subscribe(response => {
        this.router.navigateByUrl('/examenes');
        return;
      });
    }

    const { nombre, descripcion, precio } = this.examenesForm.value;

    console.log('guardar');
    const params: IExamen = {
      nombre,
      descripcion,
      precio,
      estado: true,
    };

    this.service.insert(params).subscribe((response) => {
      this.idAnalisisCreado = response.idGenerado;
      this.nombre?.disable();
      this.descripcion?.disable();
      this.precio?.disable();
      this.agregarFila(); // Agregar una fila inicial al cargar el componente

    });
  }

}
