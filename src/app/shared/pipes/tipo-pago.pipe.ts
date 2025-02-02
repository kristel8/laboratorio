import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoPagoIcon'
})
export class TipoPagoIconPipe implements PipeTransform {
  transform(value: string): string {
    const icons: { [key: string]: string } = {
      'EFECTIVO': `assets/images/caja/${value}.svg`,
      'YAPE': `assets/images/caja/${value}.svg`,
      'PLIN': `assets/images/caja/${value}.svg`,
      'POS': `assets/images/caja/${value}.svg`
    };

    return icons[value];
  }
}
