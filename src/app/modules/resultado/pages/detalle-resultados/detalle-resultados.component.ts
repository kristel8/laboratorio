import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detalle-resultados',
  templateUrl: './detalle-resultados.component.html',
  styleUrls: ['./detalle-resultados.component.scss']
})
export class DetalleResultadosComponent implements OnInit {


  constructor(
    private fb: FormBuilder
  ) { }

  detalleResultadoForm = this.fb.group({
    nroOrden: [{ value: null, disabled: true }],
  })

  ngOnInit(): void {
  }

}
