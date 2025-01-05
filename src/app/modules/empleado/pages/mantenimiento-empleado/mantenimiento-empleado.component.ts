import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IEmpleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-mantenimiento-empleado',
  templateUrl: './mantenimiento-empleado.component.html',
  styleUrls: ['./mantenimiento-empleado.component.scss']
})
export class MantenimientoEmpleadoComponent implements OnInit {

  isGuardar: boolean = false;
  titulo: string = 'Crear Empleado';
  id!: string;
  isEditar: boolean = false;

  colsEmpleado: IColumnasTabla [] = [];
  colsEmpleadoVisibles: IColumnasTabla [] = [];
  listaElementos: IEmpleado [] = [];

  tipoDocumentos: any [] = [];
  listaCargos: any [] = [];
  listaAreas: any [] = [];


  constructor(
    private fb: FormBuilder,
    private serviceEmpleado: EmpleadoService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService

  ) { }

  empleadoForm = this.fb.group({
    tipoDocumento: [null, [Validators.required]],
    numDocumento: [null, [Validators.required,  Validators.maxLength(12)]],
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    direccion: [null, [Validators.required]],
    telefono: [null, [Validators.required,  Validators.maxLength(6)]],
    celular: [null, [Validators.required,  Validators.maxLength(9)]],
    sueldo:  [null, [Validators.required,  Validators.maxLength(20)]],
    cargo: [null, [Validators.required]],
    area:  [null, [Validators.required]],
  });

  ngOnInit(): void {

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Empleado';
      this.id = id;
      this.isEditar = true;
      this.buscarIdElemento();
    }

    this.listarDropdown();
  }

  get tipoDocumento() {
    return this.empleadoForm.get('tipoDocumento');
  }

  get numDocumento() {
    return this.empleadoForm.get('numDocumento');
  }

  get nombre() {
    return this.empleadoForm.get('nombre');
  }

  get apellido() {
    return this.empleadoForm.get('apellido');
  }

  get direccion() {
    return this.empleadoForm.get('direccion');
  }

  get telefono() {
    return this.empleadoForm.get('telefono');
  }

  get celular() {
    return this.empleadoForm.get('celular');
  }

  get sueldo() {
    return this.empleadoForm.get('sueldo');
  }

  get cargo() {
    return this.empleadoForm.get('cargo');
  }

  get area() {
    return this.empleadoForm.get('area');
  }

  listarDropdown() {
    this.tipoDocumentos = [
      {
        tipo: 'DNI',
      },
      {
        tipo: 'RUC',
      },
      {
        tipo: 'CARNET DE EXTRANJERIA',
      },
    ];


    this.serviceEmpleado.getCargo().subscribe(res => {
      this.listaCargos = res;
      console.log(this.listaCargos)
    });


    this.serviceEmpleado.getArea().subscribe(res => {
      this.listaAreas = res;
    });
  }

  guardarElemento() {
    const {
      tipoDocumento,
      numDocumento,
      nombre,
      apellido,
      direccion,
      telefono,
      celular,
      sueldo,
      cargo,
      area
     } = this.empleadoForm.value;

    const params: IEmpleado = {
      idEmpleado: 0,
      tipoDocumento: tipoDocumento.tipo,
      numDocumento: numDocumento,
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      telefono: telefono,
      celular: celular,
      sueldo: sueldo,
      cargo: cargo.descripcion,
      area: area.descripcion,
      estado: true,
    };

    if (this.isEditar) {
      this.editarElemento(params);
    } else {
      this.crearElemento(params);
    }
  }

  crearElemento(params: IEmpleado) {
    this.serviceEmpleado
      .insert(params)
      .subscribe((response: IEmpleado) => {
        this.router.navigateByUrl('/empleados');
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }

  editarElemento(params: IEmpleado) {
    this.serviceEmpleado
      .update(+this.id, params)
      .subscribe((response: IEmpleado) => {
        this.router.navigateByUrl('/empleados');
        this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      });
  }

  buscarIdElemento() {
    this.serviceEmpleado.getFindById(+this.id).subscribe((res) => {
      const resultado = res;
      this.mostrarValoresInput(resultado);
    });
  }


  mostrarValoresInput(resultado: any ) {
    const tipoDocumento = this.tipoDocumentos.find((e) => e.tipo === resultado.tipoDocumento);
    const cargo = this.listaCargos.find((e) => e.descripcion === resultado.cargo);
    const area = this.listaAreas.find((e) => e.descripcion === resultado.area);

    this.empleadoForm.patchValue({
      tipoDocumento: tipoDocumento,
      numDocumento: resultado.numDocumento,
      nombre: resultado.nombre,
      apellido: resultado.apellido,
      direccion: resultado.direccion,
      telefono: resultado.telefono,
      celular: resultado.celular,
      sueldo: resultado.sueldo,
      cargo: cargo,
      area: area,
    });
  }
}
