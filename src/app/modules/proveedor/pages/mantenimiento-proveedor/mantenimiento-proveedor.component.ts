import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IProveedor } from '../../models/proveedor';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-mantenimiento-proveedor',
  templateUrl: './mantenimiento-proveedor.component.html',
  styleUrls: ['./mantenimiento-proveedor.component.scss'],
})
export class MantenimientoProveedorComponent implements OnInit {
  isGuardar: boolean = false;
  titulo: string = 'Crear Proveedor';
  id!: string;
  isEditar: boolean = false;
  tipoDocumentos: any[] = [];
  constructor(
    private fb: FormBuilder,
    private serviceProveedor: ProveedorService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) {}

  proveedorForm = this.fb.group({
    razonSocial: [null, [Validators.required]],
    tipoDocumento: [null, [Validators.required]],
    numDocumento: [null, [Validators.required]],
    rubro: [null, [Validators.required]],
    numCelular: [null, [Validators.required, Validators.minLength(9)]],
    telf: [null, [Validators.required, Validators.minLength(6)]],
    correo: [null, [Validators.required]],
    descripcion: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.listarDropdown();
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Proveedor';
      this.id = id;
      this.isEditar = true;
      this.buscarIdProveedor();
    }
  }

  get razonSocial() {
    return this.proveedorForm.get('razonSocial');
  }

  get tipoDocumento() {
    return this.proveedorForm.get('tipoDocumento');
  }

  get numDocumento() {
    return this.proveedorForm.get('numDocumento');
  }

  get rubro() {
    return this.proveedorForm.get('rubro');
  }

  get numCelular() {
    return this.proveedorForm.get('numCelular');
  }

  get telf() {
    return this.proveedorForm.get('telf');
  }

  get correo() {
    return this.proveedorForm.get('correo');
  }

  get descripcion() {
    return this.proveedorForm.get('descripcion');
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
        tipo: 'CE',
      },
    ];
  }
  guardarProveedor() {
    const {
      correo,
      descripcion,
      numCelular,
      numDocumento,
      razonSocial,
      rubro,
      telf,
      tipoDocumento,
    } = this.proveedorForm.value;

    const params: IProveedor = {
      correo: correo,
      descripcion: descripcion,
      idProveedor: 0,
      numCelular: numCelular,
      numDocumento: numDocumento,
      razonSocial: razonSocial,
      rubro: rubro,
      telf: telf,
      tipoDocumento: tipoDocumento.tipo,
      estado: true,
    };

    if (this.isEditar) {
      this.editarProveedor(params);
    } else {
      this.crearProveedor(params);
    }
  }

  crearProveedor(params: IProveedor) {
    this.serviceProveedor
      .insertProveedor(params)
      .subscribe((response: IProveedor) => {
        this.router.navigateByUrl('/proveedores');
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }

  editarProveedor(params: IProveedor) {
    this.serviceProveedor
      .updateProveedor(+this.id, params)
      .subscribe((response: IProveedor) => {
        this.router.navigateByUrl('/proveedores');
        this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      });
  }

  buscarIdProveedor() {
    this.serviceProveedor.getFindByIdProveedor(+this.id).subscribe((res) => {
      const resultado = res;
      this.mostrarValoresInput(resultado);
    });
  }

  mostrarValoresInput(resultado: any) {
    const tipoDocumento = this.tipoDocumentos.find(
      (res) => (res.tipo === resultado.tipoDocumento)
    );

    this.proveedorForm.patchValue({
      correo: resultado.correo,
      descripcion: resultado.descripcion,
      estado: resultado.estado,
      numCelular: resultado.numCelular,
      numDocumento: resultado.numDocumento,
      razonSocial: resultado.razonSocial,
      rubro: resultado.rubro,
      telf: resultado.telf,
      tipoDocumento: tipoDocumento,
    });
  }
}
