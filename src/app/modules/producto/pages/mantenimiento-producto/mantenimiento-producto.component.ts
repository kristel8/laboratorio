import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IProducto } from '../../models/producto';
import { CategoriaService } from 'src/app/modules/categoria/services/categoria.service';
import { ICategoria } from 'src/app/modules/categoria/models/categoria';
import { ISubCategoria } from 'src/app/modules/sub-categoria/models/subcategoria';
import { SubCategoriaService } from 'src/app/modules/sub-categoria/services/sub-categoria.service';


@Component({
  selector: 'app-mantenimiento-producto',
  templateUrl: './mantenimiento-producto.component.html',
  styleUrls: ['./mantenimiento-producto.component.scss']
})
export class MantenimientoProductoComponent implements OnInit {

  isGuardar: boolean = false;
  titulo: string = 'Crear Producto';
  id!: string;
  isEditar: boolean = false;
  listaUnidadMedidas: any[] = [];
  listaCategorias: ICategoria[] = [];
  listaSubCategorias: ISubCategoria[] = [];

  constructor(
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private fb: FormBuilder,
    private serviceProducto: ProductoService,
    private serviceCategoria: CategoriaService,
    private serviceSubCategoria: SubCategoriaService,
  ) { }


  productoForm = this.fb.group({
    idProducto: [{ value: null, disabled: this.isEditar }, [, Validators.required, Validators.maxLength(12)]],
    codigo: [null, [Validators.maxLength(12)]],
    categoria: [null, [Validators.required, Validators.maxLength(65)]],
    subCategoria: [null, [Validators.required, Validators.maxLength(65)]],
    descripcion: [null, [Validators.required, Validators.maxLength(85)]],
    detalle: [null, [Validators.required, Validators.maxLength(150)]],
    unidadMedida: [null, [Validators.required]],
    stockMinTienda: [null, [Validators.required, Validators.maxLength(45)]],
    stockMinGeneral: [null, [Validators.required, Validators.maxLength(45)]],
    marca: [null, [Validators.required, Validators.maxLength(45)]],
  });

  ngOnInit(): void {


    this.listarDropdown();

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Producto';
      this.id = id;
      this.isEditar = true;
      this.buscarIdProducto();
    }

  }

  get idProducto() {
    return this.productoForm.get('idProducto');
  }

  get codigo() {
    return this.productoForm.get('codigo');
  }

  get categoria() {
    return this.productoForm.get('categoria');
  }

  get subCategoria() {
    return this.productoForm.get('subCategoria');
  }

  get descripcion() {
    return this.productoForm.get('descripcion');
  }

  get detalle() {
    return this.productoForm.get('detalle');
  }

  get unidadMedida() {
    return this.productoForm.get('unidadMedida');
  }

  get stockMinTienda() {
    return this.productoForm.get('stockMinTienda');
  }
  get stockMinGeneral() {
    return this.productoForm.get('stockMinGeneral');
  }

  get marca() {
    return this.productoForm.get('marca');
  }

  listarDropdown() {

    this.listaUnidadMedidas = [
      {
        nombre: 'UND',
      },
      {
        nombre: 'KG',
      },

      {
        nombre: 'GL',
      },
      {
        nombre: 'CAJA',
      },
    ];

    this.getCategorias();
    this.getSubCategorias();

  }

  getCategorias() {
    this.serviceCategoria
      .getCategoriasActivos()
      .subscribe((res) => {
        this.listaCategorias = res;
      });

  }

  getSubCategorias() {
    this.serviceSubCategoria
      .getSubCategoriasActivos()
      .subscribe((res) => {
        this.listaSubCategorias = res;
      });

  }


  guardarProducto() {
    const {
      categoria,
      codigo,
      descripcion,
      detalle,
      stockMinGeneral,
      stockMinTienda,
      idProducto,
      marca,
      subCategoria,
      unidadMedida
    } = this.productoForm.value;

    const params: IProducto = {
      categoria: categoria.descripcion,
      codigo: codigo,
      descripcion: descripcion,
      detalle: detalle,
      estado: true,
      stockMinGeneral: stockMinGeneral,
      stockMinTienda: stockMinTienda,
      fechaModificacion: "",
      fechaRegistro: "",
      idProducto: idProducto,
      marca: marca,
      subCategoria: subCategoria.descripcion,
      unidadMedida: unidadMedida.nombre
    };


    if (this.isEditar) {
      this.editarProducto(params);
    } else {
      this.crearProducto(params);
    }
  }

  crearProducto(params: IProducto) {
    this.serviceProducto
      .insertProductos(params)
      .subscribe((response: IProducto) => {
        this.router.navigateByUrl('/productos');
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }

  editarProducto(params: IProducto) {
    console.log(this.id)
    this.serviceProducto
      .updateProductos(+this.id, params)
      .subscribe((response: IProducto) => {
        this.router.navigateByUrl('/productos');
        this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      });
  }

  buscarIdProducto() {
    this.serviceProducto.getFindByIdProductos(+this.id).subscribe((res) => {
      const resultado = res;
      this.mostrarValoresInput(resultado);
    });
  }

  mostrarValoresInput(resultado: any) {
    const { descripcion, idProducto, categoria, codigo, detalle, stockMinGeneral, stockMinTienda, marca, subCategoria, unidadMedida } = resultado;

    const itemCategoria = this.listaCategorias.find(res => res.descripcion === categoria);
    const itemUnidadMedida = this.listaUnidadMedidas.find(res => res.nombre === unidadMedida);
    const itemSubCategoria = this.listaSubCategorias.find(res => res.descripcion === subCategoria);

    this.productoForm.patchValue({
      descripcion: descripcion.toUpperCase(),
      idProducto: idProducto,
      categoria: itemCategoria,
      codigo: codigo.toUpperCase(),
      detalle: detalle.toUpperCase(),
      stockMinGeneral: stockMinGeneral,
      stockMinTienda: stockMinTienda,
      marca: marca.toUpperCase(),
      subCategoria: itemSubCategoria,
      unidadMedida: itemUnidadMedida
    });
  }


}
