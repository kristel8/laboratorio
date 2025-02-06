import { Component, OnInit } from '@angular/core';
import { IDoctor } from '../../models/doctor';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { FormBuilder, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { Observable } from 'rxjs';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.scss'],
})
export class DoctoresComponent implements OnInit {
  listaElementos: IDoctor[] = [];

  cols: IColumnasTabla[] = [];
  colsVisibles: IColumnasTabla[] = [];

  isCargado: boolean = false;
  isOpenModal: boolean = false;

  isEditar = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: DoctorService,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  doctoresForm = this.fb.group({
    idDoctor: [null],
    codigo: [null, [Validators.required, Validators.maxLength(20)]],
    nombre: [null, [Validators.required]],
    apellidos: [null, [Validators.required]],
  });

  get idDoctor() {
    return this.doctoresForm.get('idDoctor');
  }

  get codigo() {
    return this.doctoresForm.get('codigo');
  }

  get nombre() {
    return this.doctoresForm.get('nombre');
  }

  get apellidos() {
    return this.doctoresForm.get('apellidos');
  }

  ngOnInit(): void {
    this.getAllActivosElementos();
  }

  getAllActivosElementos(): void {
    const obs = new Observable<boolean>((observer) => {
      this.service.getAllActivos().subscribe((resp) => {
        this.listaElementos = resp;
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

  getColumnasTabla(): void {
    this.cols = [
      {
        field: 'idDoctor',
        header: 'ID Doctor',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'nombre',
        header: 'Nombres',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'apellidos',
        header: 'Apellidos',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'codigo',
        header: 'Codigo',
        visibility: true,
        formatoFecha: '',
      },
      {
        field: 'numAtenciones',
        header: 'N° Atenciones',
        visibility: true,
        formatoFecha: '',
      }
    ];

    this.colsVisibles = this.cols.filter((x) => x.visibility == true);
  }

  eventoAccion(datos: any) {
    const { tipo, data } = datos;
    switch (tipo) {
      case 'editar':
        this.editarElemento(data);
        break;

      case 'eliminar':
        this.eliminarElemento(data);
        break;

      default:
        console.log('Acción no aplicada');
        break;
    }
  }

  openModalDoctor(): void {
    this.isEditar = false;
    this.isOpenModal = true;
    this.doctoresForm.reset();
  }

  guardar(): void {
    if (this.isEditar) {
      this.service.update(this.idDoctor?.value, this.doctoresForm.getRawValue()).subscribe(() => {
        this.isOpenModal = false;
        this.doctoresForm.reset();
        this.getAllActivosElementos();
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
    } else {
      this.service.insert(this.doctoresForm.value).subscribe(() => {
        this.isOpenModal = false;
        this.doctoresForm.reset();
        this.getAllActivosElementos();
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
    }
  }

  eliminarElemento(data: any) {
    this.servicioMensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el registro?')
      .then((response) => {
        if (response.isConfirmed) {
          this.service
            .setInactive(data.idDoctor)
            .subscribe((res) => {
              this.getAllActivosElementos();
              this.servicioMensajesSwal.mensajeRegistroEliminado();
            });
        }
      });
  }

  editarElemento(data: any) {
    this.doctoresForm.reset();
    this.isOpenModal = true;
    this.isEditar = true;

    this.doctoresForm.patchValue({
      idDoctor: data.idDoctor,
      codigo: data.codigo,
      nombre: data.nombre,
      apellidos: data.apellidos,
    });

    this.codigo?.disable();
  }
}
