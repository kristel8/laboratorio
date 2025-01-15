import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-agregar-examenes',
  templateUrl: './agregar-examenes.component.html',
  styleUrls: ['./agregar-examenes.component.scss']
})
export class AgregarExamenesComponent implements OnInit {
    
  constructor(
    private fb: FormBuilder
  ) { }

  agregarExamenesForm = this.fb.group({
    nombre: [{value: null, disabled: false}],
    descripcion: [{value: null, disabled: false}],
    precio: [{value: null, disabled: false}]

  })

  ngOnInit(): void {
  }

}
