import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { ICategoria } from '../../models/categoria';

import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-mantenimiento-categoria',
  templateUrl: './mantenimiento-categoria.component.html',
  styleUrls: ['./mantenimiento-categoria.component.scss']
})
export class MantenimientoCategoriaComponent implements OnInit {

  isGuardar: boolean = false;
  titulo: string = 'Crear Categoría';
  id!: string;
  isEditar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private serviceCategoria: CategoriaService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService

  ) { }

  categoriaForm = this.fb.group({
   
    descripcion: [
      null,
      [Validators.required,  Validators.maxLength(45)],
    ]
   
  });

  ngOnInit(): void {

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Categoría';
      this.id = id;
      this.isEditar = true;
      this.buscarIdCategoria();
    }

  }

  get descripcion() {
    return this.categoriaForm.get('descripcion');
  }


  guardarCategoria() {
    const { descripcion } = this.categoriaForm.value;

    const params: ICategoria = {
      estado: true,
      idCategoria: 0,

      descripcion: descripcion.toUpperCase(),
     
   
    };

    if (this.isEditar) {
      this.editarCategoria(params);
    } else {
      this.crearCategoria(params);
    }
  }

  crearCategoria(params: ICategoria) {
    this.serviceCategoria
      .insertCategorias(params)
      .subscribe((response: ICategoria) => {
        this.router.navigateByUrl('/categorias');
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }

  editarCategoria(params: ICategoria) {
    this.serviceCategoria
      .updateCategorias(+this.id, params)
      .subscribe((response: ICategoria) => {
        this.router.navigateByUrl('/categorias');
        this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      });
  }

  buscarIdCategoria() {
    this.serviceCategoria.getFindByIdCategorias(+this.id).subscribe((res) => {
      const resultado = res;
      this.mostrarValoresInput(resultado);
    });
  }

  mostrarValoresInput(resultado: any) {
    this.categoriaForm.patchValue({
      descripcion: resultado.descripcion
    });
  }
  

}
