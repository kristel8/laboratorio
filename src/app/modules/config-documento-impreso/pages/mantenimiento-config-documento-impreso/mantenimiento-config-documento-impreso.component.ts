import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IConfigDocumentoImpreso } from '../../models/configDocumentoImpreso';
import { ConfigDocumentoImpresoService } from '../../services/config-documento-impreso.service';

@Component({
  selector: 'app-mantenimiento-config-documento-impreso',
  templateUrl: './mantenimiento-config-documento-impreso.component.html',
  styleUrls: ['./mantenimiento-config-documento-impreso.component.scss']
})
export class MantenimientoConfigDocumentoImpresoComponent implements OnInit {

  isGuardar: boolean = false;
  titulo: string = 'Crear Configuracion Documento Impreso';
  id!: string;
  isEditar: boolean = false;


  constructor(
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private fb: FormBuilder,
    private configDocumentoImpresoService: ConfigDocumentoImpresoService

  ) { }



  configDocumentoImpresoForm = this.fb.group({


    tituloConfiguracion: [null,[Validators.required, Validators.maxLength(45)]],
    nombreEmpresa: [null,[Validators.required,  Validators.maxLength(120)]],
    rucDocumento: [null,[Validators.required,  Validators.maxLength(65)]],
    direccion: [null,[Validators.required,  Validators.maxLength(125)]],
    descripcion: [null,[Validators.required,  Validators.maxLength(120)]],
    serieBoleta: [null,[Validators.required,  Validators.maxLength(10)]],
    numBoleta: [null,[Validators.required,  Validators.maxLength(45)]],
    serieTicket: [null,[Validators.required,  Validators.maxLength(10)]],
    numTicket: [null,[Validators.required,  Validators.maxLength(45)]],
    serieFactura: [null,[Validators.required,  Validators.maxLength(10)]],
    numFactura: [null,[Validators.required,  Validators.maxLength(45)]],


  });


  ngOnInit(): void {

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Configuracion Documento Impreson';
      this.id = id;
      this.isEditar = true;
      this.buscarIdConfigDocumentoImpreso();

    }

  }

  get tituloConfiguracion() {
    return this.configDocumentoImpresoForm.get('tituloConfiguracion');
  }

  get nombreEmpresa() {
    return this.configDocumentoImpresoForm.get('nombreEmpresa');
  }

  get rucDocumento() {
    return this.configDocumentoImpresoForm.get('rucDocumento');
  }

  get direccion() {
    return this.configDocumentoImpresoForm.get('direccion');
  }

  get descripcion() {
    return this.configDocumentoImpresoForm.get('descripcion');
  }

  get serieBoleta() {
    return this.configDocumentoImpresoForm.get('serieBoleta');
  }

  get numBoleta() {
    return this.configDocumentoImpresoForm.get('numBoleta');
  }

  get serieTicket() {
    return this.configDocumentoImpresoForm.get('serieTicket');
  }

  get numTicket() {
    return this.configDocumentoImpresoForm.get('numTicket');
  }

  get serieFactura() {
    return this.configDocumentoImpresoForm.get('serieFactura');
  }

  get numFactura() {
    return this.configDocumentoImpresoForm.get('numFactura');
  }


  guardarConfigDocumentoImpreso(): void {
    const {
      direccion,
      descripcion,
      nombreEmpresa,
      numBoleta,
      numFactura,
      numTicket,
      rucDocumento,
      serieBoleta,
      serieFactura,
      serieTicket,
      tituloConfiguracion
    } = this.configDocumentoImpresoForm.value;

    const params: IConfigDocumentoImpreso = {
      descripcion: descripcion,
      direccion: direccion,
      estado: true,
    idConfigDocumentoImpreso: 0,
      nombreEmpresa: nombreEmpresa,
      numBoleta: numBoleta,
      numFactura: numFactura,
      numTicket: numTicket,
      rucDocumento: rucDocumento,
      serieBoleta: serieBoleta,
      serieFactura: serieFactura,
      serieTicket: serieTicket,
      tituloConfiguracion: tituloConfiguracion
    };

    if (this.isEditar) {
      this.editarConfigDocumentoImpreso(params);
    } else {
      this.crearConfigDocumentoImpreso(params);
    }
  }

  crearConfigDocumentoImpreso(params: IConfigDocumentoImpreso) {
    this.configDocumentoImpresoService
      .insertConfigDocumentoImpresos(params)
      .subscribe((response: IConfigDocumentoImpreso) => {
        this.router.navigateByUrl('/config-documento-impresos');
        this.servicioMensajesSwal.mensajeGrabadoSatisfactorio();
      });
  }

  editarConfigDocumentoImpreso(params: IConfigDocumentoImpreso) {
    this.configDocumentoImpresoService
      .updateConfigDocumentoImpresos(+this.id, params)
      .subscribe((response: IConfigDocumentoImpreso) => {
        this.router.navigateByUrl('/config-documento-impresos');
        this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
      });
  }

  buscarIdConfigDocumentoImpreso() {
    this.configDocumentoImpresoService.getFindByIdConfigDocumentoImpresos(+this.id).subscribe((res) => {
      const resultado = res;
      this.mostrarValoresInput(resultado);
    });
  }

  mostrarValoresInput(resultado: any) {


    const {
      direccion,
      descripcion,
      nombreEmpresa,
      numBoleta,
      numFactura,
      numTicket,
      rucDocumento,
      serieBoleta,
      serieFactura,
      serieTicket,
      tituloConfiguracion
    } = resultado;


      this.configDocumentoImpresoForm.patchValue({
        descripcion: descripcion,
        direccion: direccion,
        nombreEmpresa: nombreEmpresa,
        numBoleta: numBoleta,
        numFactura: numFactura,
        numTicket: numTicket,
        rucDocumento: rucDocumento,
        serieBoleta: serieBoleta,
        serieFactura: serieFactura,
        serieTicket: serieTicket,
        tituloConfiguracion: tituloConfiguracion
    });
  }

}
