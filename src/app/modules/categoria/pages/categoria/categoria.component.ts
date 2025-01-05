import { Component, OnInit } from '@angular/core';
import { ICategoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  ITable,
  ITableCaption,
  ITableHeader,
} from 'src/app/shared/components/table/models/table';
import { IColumnasTabla } from 'src/app/shared/models/columnas';

import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  listaCategorias: ICategoria[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  isCargado: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getCategoria();

  }


  getCategoria() {
    const obs = new Observable<boolean>((observer) => {
      this.categoriaService.getCategoriasActivos().subscribe((resp) => {
        this.listaCategorias = resp;
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
        this.editarCategoria(data);
        break;

      case 'eliminar':
        this.eliminarCategoria(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  editarCategoria(data: any) {
    const idCategoria = data.idCategoria;
    this.router.navigateByUrl(`categorias/mantenimiento-categoria/${idCategoria}`);
  }

  eliminarCategoria(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.categoriaService
            .deleteCategorias(data.idCategoria)
            .subscribe((res) => {
              this.getCategoria();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }

}
