import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IResumenCaja } from '../../models/resumen-caja.interface';
import { CajaSucursalService } from '../../services/caja-sucursal.service';

@Component({
  selector: 'app-resumen-caja',
  templateUrl: './resumen-caja.component.html',
  styleUrls: ['./resumen-caja.component.scss']
})
export class ResumenCajaComponent implements OnInit {

  titulo = 'Resumen Caja'
  listaEstados = [{ tipo: 'ABIERTO', value: true }, { tipo: 'CERRADO', value: false }]
  response: IResumenCaja[] = [];
  resumen: IResumenCaja = {
    estado: '0',
    estadoCaja: '0',
    idCaja: '0',
    nombreSucur: '0',
    totalMovCaja: '0',
    totalVenta: '0',
    usuario: '0',
    ventaAnuladas: '0'
  };

  estado = new FormControl(true);
  fecha = new FormControl(new Date());

  constructor(
    private cajaService: CajaSucursalService,
    private authService: AuthService,
    private readonly servicioMensajesSwal: MensajesSwalService
  ) { }

  ngOnInit(): void {
    this.getResumenCaja();
  }

  getResumenCaja(): void {
    const { idCaja } = this.authService.usuario;
    const params = {
      idCaja: idCaja,
      fecha: this.fecha.value
    }

    this.cajaService.getResumenByIdCaja(params).subscribe((response) => {
      if (response.length === 0) {
        this.titulo = 'El usuario no tiene creado una caja';
      }

      this.response = response;
      this.resumen = response[0];
      let estado = (this.resumen.estadoCaja === 'true');
      this.estado.setValue(estado);
    });
  }


  onChangeEstado(event: any): void {
    const { idCaja } = this.authService.usuario;

    this.cajaService.updateCaja(idCaja).subscribe(() => {
      this.servicioMensajesSwal.mensajeActualizadoSatisfactorio();
    });
  }

  searchResumenCaja(): void {

  }
}
