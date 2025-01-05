import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { ICliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-mantenimiento-cliente',
  templateUrl: './mantenimiento-cliente.component.html',
  styleUrls: ['./mantenimiento-cliente.component.scss']
})
export class MantenimientoClienteComponent implements OnInit {

  isGuardar: boolean = false;
  titulo: string = 'Crear Cliente';
  id!: string;
  isEditar: boolean = false;

  colsEmpleado: IColumnasTabla [] = [];
  colsEmpleadoVisibles: IColumnasTabla [] = [];
  listaElementos: ICliente [] = [];

  tipoDocumentos: any [] = [];
  tipoClientes: any [] = [];

  constructor(
    private fb: FormBuilder,
    private serviceCliente: ClienteService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly formatoFecha: DatePipe,
    private readonly servicioMensajesSwal: MensajesSwalService

  ) { }

  clienteForm = this.fb.group({
    tipoCliente: [null, [Validators.required]],
    tipoDocumento: [null, [Validators.required]],
    numDocumento: [null, [Validators.required,  Validators.maxLength(12)]],
    razonSocial: [null, [Validators.required,  Validators.maxLength(45)]],
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    direccion: [null, [Validators.required]],
    correo: [null, [Validators.required,  Validators.maxLength(45)]],
    numCel: [null, [Validators.required,  Validators.maxLength(9)]],
    fecNac:  [null, [Validators.required]],
  });

  ngOnInit(): void {

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Cliente';
      this.id = id;
      this.isEditar = true;
      this.buscarIdElemento();
    }

    this.listarDropdown();
  }

  get tipoCliente() {
    return this.clienteForm.get('tipoCliente');
  }


  get tipoDocumento() {
    return this.clienteForm.get('tipoDocumento');
  }

  get numDocumento() {
    return this.clienteForm.get('numDocumento');
  }

  get nombre() {
    return this.clienteForm.get('nombre');
  }

  get apellido() {
    return this.clienteForm.get('apellido');
  }

  get direccion() {
    return this.clienteForm.get('direccion');
  }

  get numCel() {
    return this.clienteForm.get('numCel');
  }

  get fecNac() {
    return this.clienteForm.get('fecNac');
  }

  get correo() {
    return this.clienteForm.get('correo');
  }

  get razonSocial() {
    return this.clienteForm.get('razonSocial');
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

    this.tipoClientes = [
      {
        tipo: 'NATURAL'
      },
      {
        tipo: 'JURIDICA'
      }
    ]

  }

  guardarElemento() {
    const {
      tipoDocumento,
      numDocumento,
      nombre,
      apellido,
      direccion,
      numCel,
      correo,
      fecNac,
      razonSocial,
      tipoCliente
     } = this.clienteForm.value;

     const fechaTransformada = this.formatoFecha.transform(fecNac, 'yyyy-MM-dd')!;

    const params: ICliente = {
      apellido: apellido,
      correo: correo,
      direccion: direccion,
      estado: true,
      fecNac: fechaTransformada,
      idCliente: 0,
      nombre: nombre,
      numCel: numCel,
      numDocumento: numDocumento,
      razonSocial: razonSocial,
      tipoCliente: tipoCliente.tipo,
      tipoDocumento: tipoDocumento.tipo
    };

    if (this.isEditar) {
      this.editarElemento(params);
    } else {
      this.crearElemento(params);
    }
  }

  crearElemento(params: ICliente) {
    this.serviceCliente
      .insert(params)
      .subscribe((response: ICliente) => {
        this.router.navigateByUrl('/clientes');
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }

  editarElemento(params: ICliente) {
    this.serviceCliente
      .update(+this.id, params)
      .subscribe((response: ICliente) => {
        this.router.navigateByUrl('/clientes');
        this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      });
  }

  buscarIdElemento() {
    this.serviceCliente.getFindById(+this.id).subscribe((res) => {
      const resultado = res;
      this.mostrarValoresInput(resultado);
    });
  }

  mostrarValoresInput(resultado: any ) {
    const tipoCliente = this.tipoClientes.find((e) => e.tipo === resultado.tipoCliente);
    const tipoDocumento = this.tipoDocumentos.find((e) => e.tipo === resultado.tipoDocumento);

    this.clienteForm.patchValue({
      tipoCliente: tipoCliente,
      tipoDocumento: tipoDocumento,
      numDocumento: resultado.numDocumento,
      nombre: resultado.nombre,
      apellido: resultado.apellido,
      direccion: resultado.direccion,
      numCel: resultado.numCel,
      razonSocial: resultado.razonSocial,
      fecNac: resultado.fecNac,
      correo: resultado.correo,
    });
  }
}
