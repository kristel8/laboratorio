import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-agregar-resultados',
  templateUrl: './agregar-resultados.component.html',
  styleUrls: ['./agregar-resultados.component.scss'],
})
export class AgregarResultadosComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

    agregarResultadoForm = this.fb.group({
    nroOrden: [{ value: null, disabled: true }],
    apellidosyNombres: [{ value: null, disabled: true }],
    examen: [{ value: null, disabled: true }],
    fecha: [{ value: null, disabled: true }],
  });

  ngOnInit(): void {}
}
