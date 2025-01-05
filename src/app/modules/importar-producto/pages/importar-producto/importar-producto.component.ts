import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { IProducto } from '../../models/producto';
import { Observable } from 'rxjs';
import { ImportarProductoService } from '../../services/importar-producto.service';
import { IEnviarData } from '../../models/enviarData';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
@Component({
  selector: 'app-importar-producto',
  templateUrl: './importar-producto.component.html',
  styleUrls: ['./importar-producto.component.scss']
})
export class ImportarProductoComponent {

  listaProductos: IProducto[] = [];
  dataEnviar: IEnviarData[] = [];
  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];
  uploadedFiles: any[] = [];

  reader: any = "Seleccione un archivo...";

  isCargado: boolean = false;

  constructor(private importarProducto: ImportarProductoService,
    private readonly servicioMensajesSwal: MensajesSwalService) { }

  getColumnasTabla() {
    this.cols = [
      { field: 'idProducto', header: 'ID Producto', visibility: true, formatoFecha: '' },
      { field: 'codigo', header: 'Codigo', visibility: true, formatoFecha: '' },
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

  enviarDataImportar() {



    console.log("Impreso desde el boton Enviar");
    console.log(this.listaProductos);

    this.importarProducto
      .importProductos(this.dataEnviar)
      .subscribe((res) => {
        console.log(res.mensaje)
        if (res.mensaje == true) {
          this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
        } else {
          this.servicioMensajesSwal.mensajeError("¡Importacion Fallida! - ID Producto se repite");
        }
      });
  }


  onFileChange(ev: any) {
    this.isCargado = false;
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();

    const file = ev.target.files[0];
    this.reader = ev.target.files[0].name;
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      this.listaProductos = jsonData.data;
      this.dataEnviar = jsonData;

      const obs = new Observable<boolean>((observer) => {
        observer.next(true);
      });

      obs.subscribe((res) => {
        if (res) {
          this.isCargado = res;
          this.getColumnasTabla();
        }
      });
    }
    reader.readAsBinaryString(file);
  }
}
