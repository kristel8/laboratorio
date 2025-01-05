import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { ISubCategoria } from '../../models/subcategoria';
import { SubCategoriaService } from '../../services/sub-categoria.service';

@Component({
  selector: 'app-mantenimiento-sub-categoria',
  templateUrl: './mantenimiento-sub-categoria.component.html',
  styleUrls: ['./mantenimiento-sub-categoria.component.scss']
})
export class MantenimientoSubCategoriaComponent implements OnInit {

  isGuardar: boolean = false;
  titulo: string = 'Crear Sub Categoria';
  id!: string;
  isEditar: boolean = false;


  constructor(
    private fb: FormBuilder,
    private serviceSubCategoria: SubCategoriaService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }


  subCategoriaForm = this.fb.group({

    descripcion: [
      null,
      [Validators.required,  Validators.maxLength(45)],
    ]

  });


  ngOnInit(): void {

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Sub Categoría';
      this.id = id;
      this.isEditar = true;
      this.buscarIdCategoria();
    }
  }

  get descripcion() {
    return this.subCategoriaForm.get('descripcion');
  }

  guardarCategoria() {
    const { descripcion } = this.subCategoriaForm.value;

    const params: ISubCategoria = {
      estado: true,
      idSubCategoria: 0,

      descripcion: descripcion.toUpperCase(),


    };

    if (this.isEditar) {
      this.editarCategoria(params);
    } else {
      this.crearCategoria(params);
    }
  }

  crearCategoria(params: ISubCategoria) {
    this.serviceSubCategoria
      .insertSubCategorias(params)
      .subscribe((response: ISubCategoria) => {
        this.router.navigateByUrl('/subcategorias');
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }

  editarCategoria(params: ISubCategoria) {
    this.serviceSubCategoria
      .updateSubCategorias(+this.id, params)
      .subscribe((response: ISubCategoria) => {
        this.router.navigateByUrl('/subcategorias');
        this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      });
  }


  buscarIdCategoria() {
    this.serviceSubCategoria.getFindByIdSubCategorias(+this.id).subscribe((res) => {
      const resultado = res;
      this.mostrarValoresInput(resultado);
    });
  }

  mostrarValoresInput(resultado: any) {
    this.subCategoriaForm.patchValue({
      descripcion: resultado.descripcion
    });
  }

}
