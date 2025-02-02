import { Directive, HostListener, ElementRef, NgZone, Renderer2 } from '@angular/core';

@Directive({
  selector: '[toUpperCase]'
})
export class ToUpperCaseDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;
    const upperCaseValue = input.value.toUpperCase();

    this.renderer.setProperty(input, 'value', upperCaseValue);

    // Disparar evento input para que Angular detecte el cambio
  }
}
