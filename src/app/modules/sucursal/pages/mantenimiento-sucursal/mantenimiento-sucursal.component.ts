import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IConfigDocumentoImpreso } from 'src/app/modules/config-documento-impreso/models/configDocumentoImpreso';
import { ConfigDocumentoImpresoService } from 'src/app/modules/config-documento-impreso/services/config-documento-impreso.service';
import { IEmpresa } from 'src/app/modules/empresa/models/empresa';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { ISucursal, ISucursalRequest } from '../../models/sucursal';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-mantenimiento-sucursal',
  templateUrl: './mantenimiento-sucursal.component.html',
  styleUrls: ['./mantenimiento-sucursal.component.scss']
})
export class MantenimientoSucursalComponent implements OnInit {
  isGuardar: boolean = false;
  titulo: string = 'Crear Sucursal';
  id!: string;
  isEditar: boolean = false;
  listaEmpresa: IEmpresa [] = [];
  listaTipoConfiguracion: IConfigDocumentoImpreso [] = [];

  constructor(
    private fb: FormBuilder,
    private serviceSucursal: SucursalService,
    private serviceConfigDocumentoImpreso: ConfigDocumentoImpresoService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  sucursalForm = this.fb.group({
    nombreSucur: [null, [Validators.required]],
    configDocumentoImpreso: [null, [Validators.required]],
    direccion: [null, [Validators.required]],
    departamento: [null, [Validators.required]],
    provincia: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.listarDropdown();

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Sucursal';
      this.id = id;
      this.isEditar = true;
      this.buscarIdSucursal();
    }
  }

  get nombreSucur() {
    return this.sucursalForm.get('nombreSucur');
  }

  get configDocumentoImpreso() {
    return this.sucursalForm.get('configDocumentoImpreso');
  }

  get direccion() {
    return this.sucursalForm.get('direccion');
  }

  get departamento() {
    return this.sucursalForm.get('departamento');
  }

  get provincia() {
    return this.sucursalForm.get('provincia');
  }

  listarDropdown() {
    this.getConfigDocumentoImpreso();
  }

  getConfigDocumentoImpreso() {
    this.serviceConfigDocumentoImpreso.getConfigDocumentoImpresosActivos().subscribe(res => {
      this.listaTipoConfiguracion = res;
    })
  }

  guardarSucursal() {
    const {
      nombreSucur,
      configDocumentoImpreso,
      direccion,
      departamento,
      provincia
    } = this.sucursalForm.value;

    const idConfigDocumentoImpreso = this.listaTipoConfiguracion.find((res) => res.tituloConfiguracion === configDocumentoImpreso.tituloConfiguracion)
    const params: ISucursalRequest = {
      idSucursal: 0,
      nombreSucur: nombreSucur,
      idEmpresa: 1,
      idConfigDocumentoImpreso: idConfigDocumentoImpreso!.idConfigDocumentoImpreso,
      direccion: direccion,
      departamento: departamento,
      estado: true,
      provincia: provincia
    };

    if (this.isEditar) {
      this.editarSucursal(params);
    } else {
      this.crearSucursal(params);
    }
  }

  crearSucursal(params: ISucursalRequest) {
    this.serviceSucursal
      .insertSucursal(params)
      .subscribe((response: ISucursalRequest) => {
        this.router.navigateByUrl('/sucursales');
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }


  editarSucursal(params: ISucursalRequest) {
    this.serviceSucursal
      .updateSucursal(+this.id, params)
      .subscribe((response: ISucursalRequest) => {
        this.router.navigateByUrl('/sucursales');
        this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      });
  }

  buscarIdSucursal() {
    this.serviceSucursal.getFindByIdSucursal(+this.id).subscribe((res) => {
      const resultado = res;
      this.mostrarValoresInput(resultado);
    });
  }

  mostrarValoresInput(resultado: any) {
    const configDocumentoImpreso = this.listaTipoConfiguracion.find((res) => res.idConfigDocumentoImpreso === resultado.configDocumentoImpreso.idConfigDocumentoImpreso)
    console.log(configDocumentoImpreso)
    this.sucursalForm.patchValue({
      nombreSucur: resultado.nombreSucur,
      configDocumentoImpreso: configDocumentoImpreso,
      direccion: resultado.direccion,
      departamento: resultado.departamento,
      provincia: resultado.provincia
    });
  }

}
