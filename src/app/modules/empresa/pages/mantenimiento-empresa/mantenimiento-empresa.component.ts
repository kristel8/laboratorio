import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IEmpresa } from '../../models/empresa';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-mantenimiento-empresa',
  templateUrl: './mantenimiento-empresa.component.html',
  styleUrls: ['./mantenimiento-empresa.component.scss'],
})
export class MantenimientoEmpresaComponent implements OnInit {
  isGuardar: boolean = false;
  titulo: string = 'Crear Empresa';
  id!: string;
  isEditar: boolean = false;
  constructor(
    private fb: FormBuilder,
    private serviceEmpresa: EmpresaService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  empresaForm = this.fb.group({
    razonSocial: [null, [Validators.required]],
    ruc: [
      null,
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    ],
    direccion: [null, [Validators.required]],
  });

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Empresa';
      this.id = id;
      this.isEditar = true;
      this.buscarIdEmpresa();
    }
  }

  get razonSocial() {
    return this.empresaForm.get('razonSocial');
  }

  get ruc() {
    return this.empresaForm.get('ruc');
  }

  get direccion() {
    return this.empresaForm.get('direccion');
  }

  guardarEmpresa() {
    const { razonSocial, ruc, direccion } = this.empresaForm.value;

    const params: IEmpresa = {
      estado: true,
      idEmpresa: 0,
      razonSocial: razonSocial.toUpperCase(),
      ruc: ruc.toUpperCase(),
      direccion: direccion.toUpperCase(),
    };

    if (this.isEditar) {
      this.editarEmpresa(params);
    } else {
      this.crearEmpresa(params);
    }
  }

  crearEmpresa(params: IEmpresa) {
    this.serviceEmpresa
      .insertEmpresas(params)
      .subscribe((response: IEmpresa) => {
        this.router.navigateByUrl('/empresas');
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }

  editarEmpresa(params: IEmpresa) {
    this.serviceEmpresa
      .updateEmpresas(+this.id, params)
      .subscribe((response: IEmpresa) => {
        this.router.navigateByUrl('/empresas');
        this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      });
  }

  buscarIdEmpresa() {
    this.serviceEmpresa.getFindByIdEmpresas(+this.id).subscribe((res) => {
      const resultado = res;
      this.mostrarValoresInput(resultado);
    });
  }

  mostrarValoresInput(resultado: any) {
    this.empresaForm.patchValue({
      razonSocial: resultado.razonSocial,
      ruc: resultado.ruc,
      direccion: resultado.direccion,
    });
  }
}
