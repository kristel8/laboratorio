import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IAtencion, IAtencionResponse } from '../../models/atencion';
import { AtencionService } from '../../services/atencion.service';
import { MENU } from 'src/app/global/constantes';
import { PacienteService } from 'src/app/modules/paciente/services/paciente.service';
import { IPaciente } from 'src/app/modules/paciente/models/paciente';
import { DoctorService } from 'src/app/modules/doctor/services/doctor.service';
import { ExamenService } from 'src/app/modules/examenes/services/examen.service';
import { IExamen } from 'src/app/modules/examenes/models/examenes';
import { MensajesGlobales } from 'src/app/global/mensajes';
import { switchMap } from 'rxjs/operators';
import { IAtencionAnalisis } from '../../models/atencion-analisis';
import { AuthService } from 'src/app/auth/services/auth.service';
import { of } from 'rxjs';
import { MensajesToastService } from 'src/app/shared/services/mensajes-toast.service';
import { LocaleUtil } from 'src/app/global/locale.utils';

@Component({
  selector: 'app-crear-atencion',
  templateUrl: './crear-atencion.component.html',
  styleUrls: ['./crear-atencion.component.scss']
})
export class CrearAtencionComponent implements OnInit {
  menuOptions!: any[];
  menuControl = new FormControl(MENU.Paciente);
  menu = MENU;

  isGuardar: boolean = false;
  titulo: string = 'Crear Atencion';
  isEditar: boolean = false;
  tipoDocumentos: any[] = [];
  generos: any[] = [];
  referencias: any[] = [];
  id!: string;
  isNotLoaded = true;
  minDate: Date;
  maxDate: Date;
  pacientes: IPaciente[] = [];
  cols: any = [];
  elementos: IExamen[] = [];
  selectedItems: IExamen[] = [];
  loading = true;
  mesajeNotItems = MensajesGlobales._MENSAJE_NOT_ITEMS;

  constructor(
    private fb: FormBuilder,
    private service: AtencionService,
    private servicePaciente: PacienteService,
    private serviceDoctor: DoctorService,
    private serviceExamen: ExamenService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private readonly serviceMensajesToast: MensajesToastService,
    private readonly formatoFecha: DatePipe,
    private serviceAuth: AuthService,
    private util: LocaleUtil
  ) {
    const currentDate = new Date();
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = currentDate;

    this.cols = [
      { field: 'idAnalisis', header: 'ID Exámen' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'precio', header: 'Precio' },
    ];
  }

  atencionForm = this.fb.group({
    pacienteForm: this.fb.group({
      tipoDocumento: [null, [Validators.required]],
      numDocumento: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
      apellidos: [null, [Validators.required]],
      nombres: [null, [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      edad: [null, [Validators.required]],
      email: [null, [Validators.required]],
      celular: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      direccion: [null, [Validators.required]],
      antecedentes: [null, [Validators.required]],
      referencia: [null],
      idPaciente: [null],
    }),

    examenForm: this.fb.group({
    }),
  });

  get idPaciente() {
    return this.pacienteFormCtrl.get('idPaciente');
  }

  get tipoDocumento() {
    return this.pacienteFormCtrl.get('tipoDocumento');
  }

  get numDocumento() {
    return this.pacienteFormCtrl.get('numDocumento');
  }

  get nombres() {
    return this.pacienteFormCtrl.get('nombres');
  }

  get apellidos() {
    return this.pacienteFormCtrl.get('apellidos');
  }

  get direccion() {
    return this.pacienteFormCtrl.get('direccion');
  }

  get fechaNacimiento() {
    return this.pacienteFormCtrl.get('fechaNacimiento');
  }

  get celular() {
    return this.pacienteFormCtrl.get('celular');
  }

  get genero() {
    return this.pacienteFormCtrl.get('genero');
  }

  get email() {
    return this.pacienteFormCtrl.get('email');
  }

  get antecedentes() {
    return this.pacienteFormCtrl.get('antecedentes');
  }

  get referencia() {
    return this.pacienteFormCtrl.get('referencia');
  }

  get pacienteFormCtrl() {
    return this.atencionForm.get('pacienteForm')!;
  }

  get examenFormCtrl() {
    return this.atencionForm.get('examenForm')!;
  }

  ngOnInit(): void {
    this.menuOptions = [
      { name: 'Datos paciente', value: MENU.Paciente, inactive: false },
      { name: 'Examenes', value: MENU.Examen, inactive: true },
    ];

    this.pacienteFormCtrl.disable();
    this.numDocumento?.enable();
    this.referencia?.enable();
    this.tipoDocumento?.enable();

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Atencion';
      this.id = id;
      this.isEditar = true;
      this.buscarIdElemento();
    }

    this.listarDropdown();
    this.tipoDocumento?.setValue(this.tipoDocumentos[0]);
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

    this.servicePaciente.getAllActivos().subscribe((pacientes) => {
      this.pacientes = pacientes;
    });

    this.serviceDoctor.getAllActivos().subscribe((doctores) => {
      this.referencias = doctores;
    })
  }

  buscarPaciente(): void {
    const dniIngresado = this.numDocumento?.value;
    const paciente = this.pacientes.find((paciente) => paciente.numDocumento === dniIngresado);
    this.isNotLoaded = true;

    if (paciente) {
      this.isNotLoaded = false;
      const genero = this.generos.find((genero) => genero.tipo === paciente.genero);
      const edad = this.util.calcularEdad(paciente.fechaNacimiento);
      console.log(edad);
      this.pacienteFormCtrl.patchValue({
        idPaciente: paciente.idPaciente,
        apellidos: paciente.apellidos,
        nombres: paciente.nombre,
        fechaNacimiento: paciente.fechaNacimiento,
        edad: `${edad.años} años, ${edad.meses} meses, ${edad.días} días `,
        genero: genero,
        email: paciente.email,
        celular: paciente.celular,
        direccion: paciente.direccion,
        antecedentes: paciente.antecedentes,
      });

      this.pacienteFormCtrl.updateValueAndValidity();
    } else {
      this.serviceMensajesToast.showError('El paciente no se encuentra registrado.');
    }
  }

  siguiente(): void {
    this.menuControl.setValue(MENU.Examen);

    this.serviceExamen.getAllActivos().subscribe((examenes) => {
      this.elementos = examenes;
      this.loading = false;
    });
  }
  guardarElemento(): void {

    const params: IAtencion = {
      fecha: new Date(),
      idPaciente: this.idPaciente!.value,
      estadoOrden: 'Generado',
      estado: true,
      idUsuario: this.serviceAuth.usuario.idUsuario,
      idDoctor: this.referencia!.value?.idDoctor ?? 0
    };

    this.crearElemento(params);
  }

  crearElemento(params: IAtencion) {
    this.service
      .insert(params).pipe(
        switchMap((response: IAtencionResponse) => {
          if (response.idGenerado) {
            const request = this.selectedItems.map((item) => ({
              idAtencion: response.idGenerado,
              idAnalisis: item.idAnalisis,
              estado: true,
            } as IAtencionAnalisis))

            return this.service.insertAnalisis(request);
          }

          return of(undefined);

        })
      ).subscribe(() => {
        this.router.navigateByUrl('/atencion');
      });
  }

  editarElemento(params: IAtencion) {
    this.service.update(+this.id, params).subscribe(() => {
      this.router.navigateByUrl('/atencion');
    });
  }

  buscarIdElemento() {
    this.service.getFindById(+this.id).subscribe((res) => {
      const resultado = res[0];
      this.mostrarValoresInput(resultado);
    });
  }

  mostrarValoresInput(resultado: any) {
    const genero = this.generos.find((e) => e.tipo === resultado.genero);
    const referencia = this.referencias.find((e) => e.tipo === resultado.referencia);
    const fechaTransformada = this.formatoFecha.transform(resultado.fechaNacimiento, 'yyyy-MM-dd')!;

    this.tipoDocumento?.disable();
    this.numDocumento?.disable();

    this.atencionForm.patchValue({
      tipoDocumento: resultado.tipoDocumento,
      numDocumento: resultado.numDocumento,
      apellidos: resultado.apellidos,
      nombres: resultado.nombre,
      fechaNacimiento: fechaTransformada,
      genero: genero,
      email: resultado.email,
      celular: resultado.celular,
      edad: resultado.edad,
      antecedentes: resultado.antecedentes,
      referencia: referencia,
    });

    console.log(this.atencionForm.getRawValue());
  }

}
