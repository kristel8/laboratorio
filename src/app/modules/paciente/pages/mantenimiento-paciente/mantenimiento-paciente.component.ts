import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { LocaleUtil } from 'src/app/global/locale.utils';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IPaciente } from '../../models/paciente';
import { PacienteService } from '../../services/paciente.service';

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
    private util: LocaleUtil

  ) {
    const currentDate = new Date();
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = currentDate;
  }

  pacienteForm = this.fb.group({
    tipoDocumento: [null, [Validators.required]],
    numDocumento: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
    apellidos: [null, [Validators.required]],
    nombres: [null, [Validators.required]],
    fechaNacimiento: [null, [Validators.required]],
    genero: [null, [Validators.required]],
    edad: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
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

  get edad() {
    return this.pacienteForm.get('edad');
  }

  ngOnInit(): void {

    this.edad?.disable();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Paciente';
      this.id = id;
      this.isEditar = true;
      this.buscarIdElemento();
    }

    this.listarDropdown();

    this.tipoDocumento?.setValue(this.tipoDocumentos[0]);


    this.fechaNacimiento?.valueChanges.pipe(
      startWith(this.fechaNacimiento.value),
      distinctUntilChanged()
    ).subscribe((fechaNacimiento) => {
      if (fechaNacimiento) this.selectFecha();
    });
  }

  listarDropdown(): void {
    this.tipoDocumentos = [
      {
        tipo: 'DNI',
      },
      {
        tipo: 'CE',
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
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }

  editarElemento(params: IPaciente) {
    this.service.update(+this.id, params).subscribe(() => {
      this.router.navigateByUrl('/paciente');
      this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
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
    const tipoDocumento = this.tipoDocumentos.find((e) => e.tipo === resultado.tipoDocumento);

    this.tipoDocumento?.disable();
    this.numDocumento?.disable();

    this.pacienteForm.patchValue({
      tipoDocumento: tipoDocumento,
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

  selectFecha(): void {
    const fechaTransformada = this.formatoFecha.transform(this.fechaNacimiento?.value, 'yyyy-MM-dd')!;
    const edadTransformada = this.util.calcularEdad(fechaTransformada);
    this.edad?.setValue(`${edadTransformada.años} años, ${edadTransformada.meses} meses, ${edadTransformada.días} días`)
  }
}
