import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-examen',
  templateUrl: './editar-examen.component.html',
  styleUrls: ['./editar-examen.component.scss']
})
export class EditarExamenComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  editarExamenForm = this.fb.group({
    nombre: [{value: null, disabled: false}],
    descripcion: [{value: null, disabled: false}],
    precio: [{value: null, disabled: false}]
  })

  ngOnInit(): void {
  }

 

}
