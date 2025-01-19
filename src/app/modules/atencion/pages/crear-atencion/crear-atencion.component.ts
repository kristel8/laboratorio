import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IAtencion } from '../../models/atencion';
import { AtencionService } from '../../services/atencion.service';

@Component({
  selector: 'app-crear-atencion',
  templateUrl: './crear-atencion.component.html',
  styleUrls: ['./crear-atencion.component.scss']
})
export class CrearAtencionComponent implements OnInit {
   
  isGuardar: boolean = false;
  titulo: string = 'Crear Atencion';
  isEditar: boolean = false;
  tipoDocumentos: any[] = [];
  generos: any[] = [];
  referencias: any[] = [];
  id!: string;

  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
        private service: AtencionService,
        private router: Router,
        private _ActivatedRoute: ActivatedRoute,
        private readonly servicioMensajesSwal: MensajesSwalService,
        private readonly formatoFecha: DatePipe,
  ) {
    const currentDate = new Date();
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = currentDate;
   }
 
   atencionForm = this.fb.group({
       tipoDocumento: ['DNI', [Validators.required]],
       numDocumento: [null, [Validators.required, Validators.maxLength(8)]],
       apellidos: [null, [Validators.required]],
       nombres: [null, [Validators.required]],
       fechaNacimiento: [null, [Validators.required]],
       genero: [null, [Validators.required]],
       email: [null, [Validators.required]],
       celular: [null, [Validators.required, Validators.maxLength(9)]],
       edad: [null, [Validators.required]],
       antecedentes: [null, [Validators.required]],
       referencia: [null, [Validators.required]],
      });
   
      get tipoDocumento() {
        return this.atencionForm.get('tipoDocumento');
      }
    
      get numDocumento() {
        return this.atencionForm.get('numDocumento');
      }
    
      get nombres() {
        return this.atencionForm.get('nombres');
      }
    
      get apellidos() {
        return this.atencionForm.get('apellidos');
      }
    
      get edad() {
        return this.atencionForm.get('edad');
      }
    
      get fechaNacimiento() {
        return this.atencionForm.get('fechaNacimiento');
      }
    
      get celular() {
        return this.atencionForm.get('celular');
      }
    
      get genero() {
        return this.atencionForm.get('genero');
      }
    
      get email() {
        return this.atencionForm.get('email');
      }
    
      get antecedentes() {
        return this.atencionForm.get('antecedentes');
      }

      get referencia() {
        return this.atencionForm.get('referencia');
      }
    

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Atencion';
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

    this.referencias = [
      { tipo: 'Nombre 1' },
      { tipo: 'Nombre 2' },
      { tipo: 'Nombre 3' }
    ]
  }

  guardarElemento() {
    const {
      tipoDocumento,
      numDocumento,
      apellidos,
      nombres,
      fechaNacimiento,
      genero,
      email,
      celular,
      edad,
      antecedentes,
      referencia,
    } = this.atencionForm.value;

    const params: IAtencion = {
          tipoDocumento: tipoDocumento,
          numDocumento,
          apellidos,
          nombre: nombres,
          fechaNacimiento,
          genero: genero.tipo,
          email,
          celular,
          edad,
          antecedentes,
          estado: true,
          referencia: referencia.tipo,
        };

        if (this.isEditar) {
          this.editarElemento(params);
        } else {
          this.crearElemento(params);
        }

}

crearElemento(params: IAtencion) {
    this.service
      .insert(params)
      .subscribe((response: IAtencion) => {
        this.router.navigateByUrl('/atencion');
        //this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }

  editarElemento(params: IAtencion) {
      this.service.update(+this.id, params).subscribe(() => {
        this.router.navigateByUrl('/atencion');
        //this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
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
      const fechaTransformada = this.formatoFecha.transform(resultado.fechaNacimiento, 'dd-MM-yyyy')!;
  
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
    }

}
