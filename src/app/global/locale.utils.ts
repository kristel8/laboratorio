import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleUtil {
  constructor() {
  }

  getItem(param: string) {
    return JSON.parse(localStorage.getItem(param) as string);
  }

  setItem(title: string, param: any) {
    if( typeof param === 'string') {
      return localStorage.setItem(title, param);
    }

    return localStorage.setItem(title, JSON.stringify(param));
  }

  removeItem(param: string) {
    return localStorage.removeItem(param);
  }

  isObjectOrArray(value: any): boolean {
    return (
      value !== null &&
      (typeof value === 'object' || Array.isArray(value))
    );
  }

  calcularEdad(fechaNacimiento: string): { años: number, meses: number, días: number } {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();

    let años = hoy.getFullYear() - nacimiento.getFullYear();
    let meses = hoy.getMonth() - nacimiento.getMonth();
    let días = hoy.getDate() - nacimiento.getDate();

    if (meses < 0) {
      años--;
      meses += 12;
    }

    if (días < 0) {
      meses--;
      const ultimoDiaMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
      días += ultimoDiaMesAnterior;
    }

    return { años, meses, días };
  }
}
