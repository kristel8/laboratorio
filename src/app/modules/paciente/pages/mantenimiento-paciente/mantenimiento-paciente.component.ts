import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IPaciente } from '../../models/paciente';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mantenimiento-paciente',
  templateUrl: './mantenimiento-paciente.component.html',
  styleUrls: ['./mantenimiento-paciente.component.scss']
})
export class MantenimientoPacienteComponent implements OnInit {

  isGuardar: boolean = false;
  titulo: string = 'Crear Paciente';
  isEditar: boolean = false;
  tipoDocumentos: any[] = [];
  generos: any[] = [];
  id!: string;

  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private service: PacienteService,
    private router: Router,
    private route: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private readonly formatoFecha: DatePipe,

  ) {
    const currentDate = new Date();
    this.minDate = new Date(1900, 0, 1); // 1 de enero de 1900
    this.maxDate = currentDate; // Fecha actual
  }

  pacienteForm = this.fb.group({
    tipoDocumento: ['DNI', [Validators.required]],
    numDocumento: [null, [Validators.required, Validators.maxLength(8)]],
    apellidos: [null, [Validators.required]],
    nombres: [null, [Validators.required]],
    fechaNacimiento: [null, [Validators.required]],
    genero: [null, [Validators.required]],
    email: [null, [Validators.required]],
    celular: [null, [Validators.required, Validators.maxLength(9)]],
    direccion: [null, [Validators.required]],
    antecedentes: [null, [Validators.required]],
  });

  get tipoDocumento() {
    return this.pacienteForm.get('tipoDocumento');
  }

  get numDocumento() {
    return this.pacienteForm.get('numDocumento');
  }

  get nombres() {
    return this.pacienteForm.get('nombres');
  }

  get apellidos() {
    return this.pacienteForm.get('apellidos');
  }

  get direccion() {
    return this.pacienteForm.get('direccion');
  }

  get fechaNacimiento() {
    return this.pacienteForm.get('fechaNacimiento');
  }

  get celular() {
    return this.pacienteForm.get('celular');
  }

  get genero() {
    return this.pacienteForm.get('genero');
  }

  get email() {
    return this.pacienteForm.get('email');
  }

  get antecedentes() {
    return this.pacienteForm.get('antecedentes');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Paciente';
      this.id = id;
      this.isEditar = true;
      this.buscarIdElemento();
    }

    this.listarDropdown();
  }

  listarDropdown(): void {
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

    this.generos = [
      { tipo: 'MASCULINO' },
      { tipo: 'FEMENINO' }
    ]
  }

  guardarElemento(): void {
    const {
      tipoDocumento,
      numDocumento,
      apellidos,
      nombres,
      fechaNacimiento,
      genero,
      email,
      celular,
      direccion,
      antecedentes,
    } = this.pacienteForm.getRawValue();

    const params: IPaciente = {
      tipoDocumento,
      numDocumento,
      apellidos,
      nombre: nombres,
      fechaNacimiento,
      genero: genero.tipo,
      email,
      celular,
      direccion,
      antecedentes,
      estado: true,
    };

    if (this.isEditar) {
      this.editarElemento(params);
    } else {
      this.crearElemento(params);
    }
  }

  crearElemento(params: IPaciente) {
    this.service
      .insert(params)
      .subscribe((response: IPaciente) => {
        this.router.navigateByUrl('/paciente');
        //this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }

  editarElemento(params: IPaciente) {
    console.log(params);
    this.service.update(+this.id, params).subscribe(() => {
      this.router.navigateByUrl('/paciente');
      //this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
    });
  }

  buscarIdElemento(): void {
    this.service.getFindById(+this.id).subscribe((resultado) => {
      this.mostrarValoresInput(resultado);
    });
  }


  mostrarValoresInput(item: any) {
    const resultado = item[0];
    const genero = this.generos.find((e) => e.tipo === resultado.genero);
    const fechaTransformada = this.formatoFecha.transform(resultado.fechaNacimiento, 'yyyy-MM-dd')!;

    this.numDocumento?.disable();

    console.log('resultado', resultado);
    this.pacienteForm.patchValue({
      tipoDocumento: resultado.tipoDocumento,
      numDocumento: resultado.numDocumento,
      apellidos: resultado.apellidos,
      nombres: resultado.nombre,
      fechaNacimiento: fechaTransformada,
      genero: genero,
      email: resultado.email,
      celular: resultado.celular,
      direccion: resultado.direccion,
      antecedentes: resultado.antecedentes,
    });
  }

}
