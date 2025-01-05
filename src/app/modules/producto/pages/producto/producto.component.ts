import { Component, OnInit } from '@angular/core';
import { IProducto } from '../../models/producto';
import {
  ITable,
  ITableCaption,
  ITableHeader,
} from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { ProductoService } from '../../services/producto.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  listaProductos: IProducto[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];

  propiedadesTabla!: ITable;
  propiedadesCaption!: ITableCaption;
  propiedadesHeader!: ITableHeader;

  isCargado: boolean = false;

  constructor(
    private productoService: ProductoService,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto() {
    const obs = new Observable<boolean>((observer) => {
      this.productoService.getProductosActivos().subscribe((resp) => {
        this.listaProductos = resp;
        observer.next(true);
      });
    });

    obs.subscribe((res) => {
      if (res) {
        this.isCargado = res;
        this.getColumnasTabla();
      }
    });
  }

  getColumnasTabla() {
    this.cols = [
      {  field: 'idProducto',  header: 'ID Producto',  visibility: true,  formatoFecha: ''   },
      {  field: 'codigo',  header: 'Codigo',  visibility: true,  formatoFecha: '' },
      { field: 'descripcion', header: 'Descripción', visibility: true, formatoFecha: '' },
      { field: 'detalle', header: 'Detalle', visibility: true, formatoFecha: '' },
      { field: 'categoria', header: 'Categoria', visibility: true, formatoFecha: '' },
      { field: 'subCategoria', header: 'Sub Categoria', visibility: true, formatoFecha: '' },
      { field: 'unidadMedida', header: 'Unidad de Medida', visibility: true, formatoFecha: '' },
      { field: 'stockMinTienda', header: 'Stock Minimo Sucursal', visibility: true, formatoFecha: '' },
      { field: 'stockMinGeneral', header: 'Stock Minimo General', visibility: true, formatoFecha: '' },
      { field: 'marca', header: 'Marca', visibility: true, formatoFecha: '' },
      { field: 'fechaRegistro', header: 'Fecha de Registro', visibility: true, formatoFecha: '' },
      { field: 'fechaModificacion', header: 'Fecha de Modificacion', visibility: true, formatoFecha: '' },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.editarProducto(data);
        break;

      case 'eliminar':
        this.eliminarProducto(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  editarProducto(data: any) {
    const idProducto = data.idProducto;
    this.router.navigateByUrl(`productos/mantenimiento-producto/${idProducto}`);
  }

  eliminarProducto(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.productoService
            .deleteProductos(data.idProducto)
            .subscribe((res) => {
              this.getProducto();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }
}
