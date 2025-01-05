import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITable, ITableCaption, ITableHeader } from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { ISubCategoria } from '../../models/subcategoria';
import { SubCategoriaService } from '../../services/sub-categoria.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sub-categoria',
  templateUrl: './sub-categoria.component.html',
  styleUrls: ['./sub-categoria.component.scss']
})
export class SubCategoriaComponent implements OnInit {

  listaSubCategorias: ISubCategoria[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];

  propiedadesTabla!: ITable;
  propiedadesCaption!: ITableCaption;
  propiedadesHeader!: ITableHeader;

  isCargado: boolean = false;


  constructor(
    private subCategoriaService: SubCategoriaService,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getSubCategoria();
  }


  getSubCategoria() {
    const obs = new Observable<boolean>((observer) => {
      this.subCategoriaService.getSubCategoriasActivos().subscribe((resp) => {
        this.listaSubCategorias = resp;
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
      {
        field: 'descripcion',
        header: 'Descripción',
        visibility: true,
        formatoFecha: '',
      },
      { field: 'estado', header: 'Estado', visibility: true, formatoFecha: '' },
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.editarSubCategoria(data);
        break;

      case 'eliminar':
        this.eliminarSubCategoria(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  editarSubCategoria(data: any) {
    const idSubCategoria = data.idSubCategoria;
    this.router.navigateByUrl(`subcategorias/mantenimiento-subcategoria/${idSubCategoria}`);
  }

  eliminarSubCategoria(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.subCategoriaService
            .deleteSubCategorias(data.idSubCategoria)
            .subscribe((res) => {
              this.getSubCategoria();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }

}
