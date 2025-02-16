import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IEmpleado } from 'src/app/modules/empleado/models/empleado';
import { EmpleadoService } from 'src/app/modules/empleado/services/empleado.service';
import { IColumnasTabla } from 'src/app/shared/models/columnas';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IDetallePermiso, IMenu, ITipoUsuario, IUsuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-mantenimiento-usuario',
  templateUrl: './mantenimiento-usuario.component.html',
  styleUrls: ['./mantenimiento-usuario.component.scss']
})
export class MantenimientoUsuarioComponent implements OnInit {

  isGuardar: boolean = false;
  titulo: string = 'Crear Usuario';
  id!: string;
  isEditar: boolean = false;

  listaTipoUsuario: ITipoUsuario[] = [];
  isDNIEmpleadoInvalid: boolean = false;
  isBuscadorDeEmpleado: boolean = false;

  colsEmpleado: IColumnasTabla[] = [];
  colsEmpleadoVisibles: IColumnasTabla[] = [];
  listaEmpleados: IEmpleado[] = [];
  rowSeleccionado!: IEmpleado;

  listaPorAsignar: IMenu[] = [];
  listaAsignados: IMenu[] = [];

  disabledCaja: boolean = false;
  idUsuario!: number;

  constructor(
    private fb: FormBuilder,
    private serviceUsuario: UsuarioService,
    private serviceEmpleado: EmpleadoService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService

  ) { }

  usuarioForm = this.fb.group({
    usuario: [null, [Validators.required, Validators.maxLength(20)]],
    contrasena: [null, [Validators.required, Validators.maxLength(20)]],
    tipoUsuario: [null, [Validators.required]],
    empleado: [null],
    numEmpleado: [null, [Validators.required]],
    datosEmpleado: [{ value: null, disabled: true }],
  });

  ngOnInit(): void {
    this.getMenus();

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Usuario';
      this.id = id;
      this.isEditar = true;
      this.usuario?.disable();

      this.serviceUsuario.getFindById(+this.id).subscribe((resultado) => {
        this.mostrarValoresInput(resultado[0]);
      });
    }

    this.listaTipoUsuario = [
      { tipoUsuario: 'ADMINISTRADOR' },
      { tipoUsuario: 'LABORATORISTA' }
    ]

  }

  get usuario() {
    return this.usuarioForm.get('usuario');
  }

  get contrasena() {
    return this.usuarioForm.get('contrasena');
  }

  get tipoUsuario() {
    return this.usuarioForm.get('tipoUsuario');
  }

  get descripcion() {
    return this.usuarioForm.get('descripcion');
  }

  get numEmpleado() {
    return this.usuarioForm.get('numEmpleado');
  }

  getMenus() {
    this.getEmpleados();
    this.serviceUsuario.getMenuAllActive().subscribe(res => {
      if (this.isEditar) {
        this.listaPorAsignar = res;
        this.buscarIdDetallePermiso().subscribe((resultado: any) => {
          resultado.forEach((e: any) => {
            this.listaPorAsignar = this.listaPorAsignar.filter((el) => el.idMenu != e.idMenu);
          });
        })
      } else {
        this.listaPorAsignar = res;
      }
    })
  }

  guardarElemento() {
    const { usuario, contrasena, tipoUsuario, empleado } = this.usuarioForm.value;
    const params: IUsuario = {
      contrasena: contrasena,
      idEmpleado: empleado.idEmpleado,
      tipoUsuario: tipoUsuario.tipoUsuario,
      usuario: usuario,
    };


    if (this.isEditar) {
      this.editarElemento(params);
      this.guardarDetallePermiso(+this.id);
    } else {
      this.crearElemento(params).subscribe((idUsuario: any) => {
        if (idUsuario) {
          this.guardarDetallePermiso(idUsuario);
        }
      });
    }
  }

  guardarDetallePermiso(idUsuario: number) {
    let listaDetallePermiso: IDetallePermiso[] = [];

    this.listaAsignados.forEach(res => {
      const detallePermiso: IDetallePermiso = {
        idMenu: res.idMenu,
        idUsuario: idUsuario
      }

      listaDetallePermiso.push(detallePermiso);
    });

    if (this.isEditar) {
      this.editarDetallePermiso(listaDetallePermiso);
    } else {
      this.crearDetallePermiso(listaDetallePermiso);
    }

  }

  crearDetallePermiso(params: IDetallePermiso[]) {
    this.serviceUsuario.insertDetallePermiso(params).subscribe((res) => {
      this.router.navigateByUrl('/usuarios');
      this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
    });
  }

  editarDetallePermiso(params: IDetallePermiso[]) {
    this.serviceUsuario.updateDetallePermiso(+this.id, params).subscribe((res) => {
      this.router.navigateByUrl('/usuarios');
    });
  }


  crearElemento(params: IUsuario) {
    const obs = new Observable((observer) => {
      this.serviceUsuario
        .insert(params)
        .subscribe((response: IUsuario) => {
          if (response.idGenerado) {
            this.idUsuario = response.idGenerado as number;
            observer.next(this.idUsuario);
          }
        });
    });

    return obs;

  }

  editarElemento(params: IUsuario) {
    this.serviceUsuario
      .update(+this.id, params)
      .subscribe(() => {
        this.router.navigateByUrl('/usuarios');
        this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      });
  }

  buscarIdElemento() {
    this.serviceUsuario.getFindById(+this.id).subscribe((res) => {
      const resultado = res;
      this.mostrarValoresInput(resultado[0]);
    });
  }

  buscarIdDetallePermiso() {
    const obs = new Observable((observer) => {
      this.serviceUsuario.getFindByIdDetallePermiso(+this.id).subscribe((res) => {
        const resultado = res;
        observer.next(resultado);
        this.mostrarPermisosAsignados(resultado);
      });

    });

    return obs;
  }

  mostrarValoresInput(resultado: any) {
    const tipoUsuario = this.listaTipoUsuario.find((e => e.tipoUsuario === resultado.tipoUsuario));
    const empleado = this.listaEmpleados.find((e => e.idEmpleado === resultado.idEmpleado)) as IEmpleado;

    this.usuarioForm.patchValue({
      usuario: resultado.usuario,
      contrasena: resultado.contrasena,
      tipoUsuario: tipoUsuario,
      empleado: empleado,
      numEmpleado: empleado?.numDocumento,
      datosEmpleado: `${empleado?.nombre} ${empleado?.apellido}`,
    });
  }

  mostrarPermisosAsignados(resultado: any) {
    this.listaAsignados = resultado;
  }



  showBuscadorDeEmpleado(event: any) {
    this.isBuscadorDeEmpleado = true;
    this.getColumnasTablaEmpleado();
  }


  getColumnasTablaEmpleado() {
    this.colsEmpleado = [
      { field: 'tipoDocumento', header: 'Tipo de Documento', visibility: true, formatoFecha: '' },
      { field: 'numDocumento', header: 'Número de Documento', visibility: true, formatoFecha: '' },
      { field: 'nombre', header: 'Nombre', visibility: true, formatoFecha: '' },
      { field: 'apellido', header: 'Apellidos', visibility: true, formatoFecha: '' },
      { field: 'direccion', header: 'Dirección', visibility: true, formatoFecha: '' },
      { field: 'telefono', header: 'Telefono', visibility: true, formatoFecha: '' },
      { field: 'celular', header: 'Celular', visibility: true, formatoFecha: '' },
    ];

    this.colsEmpleadoVisibles = this.colsEmpleado.filter(
      (x) => x.visibility == true
    );
  }

  getEmpleados(): void {
    this.serviceEmpleado.getAllActivos().subscribe((res) => {
      this.listaEmpleados = res;
    })
  }

  buscarEmpleado(event: any) {
    this.isDNIEmpleadoInvalid = false;
    const valorActual = this.usuarioForm.value.numEmpleado;
    if (valorActual && valorActual.length != 9) {
      this.usuarioForm.controls['datosEmpleado'].reset();
    }

    if (event.keyCode == 13) {
      const valorEncontrado = this.listaEmpleados.find(
        (x) => x.numDocumento === valorActual
      );
      if (valorEncontrado) {
        this.usuarioForm.patchValue(
          {
            datosEmpleado: ` ${valorEncontrado.nombre} ${valorEncontrado.apellido}`,
            empleado: valorEncontrado
          });
      } else {
        this.isDNIEmpleadoInvalid = true;
        this.usuarioForm.controls['datosEmpleado'].reset();
      }
    }
  }

  onRowEmpleadoSelected(event: any) {
    this.rowSeleccionado = event.data;
  }

  putEmpleadoSeleccionado() {
    if (this.rowSeleccionado) {
      const { numDocumento, nombre, apellido } = this.rowSeleccionado;
      this.usuarioForm.patchValue({
        numEmpleado: numDocumento,
        datosEmpleado: `${nombre}  ${apellido}`,
        empleado: this.rowSeleccionado
      });
      this.isDNIEmpleadoInvalid = false;
      this.isBuscadorDeEmpleado = false;
    }
  }

}
