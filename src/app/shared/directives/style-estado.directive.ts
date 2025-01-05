import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStyleEstado]',
})
export class StyleEstadoDirective implements OnInit {
  @Input() value = '';

  constructor(private el: ElementRef) { }

  ngOnInit() {
    switch (this.value.toString()) {
      case 'EMITIDO':
        this.el.nativeElement.classList.add('estadoAmarillo');
        break;

      case 'RECEPCIONADO':
        this.el.nativeElement.classList.add('estadoVerde');

        break;

      case 'RECHAZADO':
        this.el.nativeElement.classList.add('estadoRojo');
        break;


      case 'AGOTANDOSE':
        this.el.nativeElement.classList.add('estadoAmarillo');
        break;

      case 'EN STOCK':
        this.el.nativeElement.classList.add('estadoAmarillo');

        break;

      case 'SIN STOCK':
        this.el.nativeElement.classList.add('estadoRojo');
        break;

      case 'CONCLUIDA':
        this.el.nativeElement.classList.add('estadoVerde');
        break;

      case 'ANULADO':
        this.el.nativeElement.classList.add('estadoRojo');
        break;

      case '0':
        this.el.nativeElement.classList.add('estadoRojo');
        break;

      case '1':
        this.el.nativeElement.classList.add('estadoVerde');
        break;

        case 'false':
          this.el.nativeElement.classList.add('estadoRojo');
          break;

        case 'true':
          this.el.nativeElement.classList.add('estadoVerde');
          break;
      default:
        break;
    }
  }
}
