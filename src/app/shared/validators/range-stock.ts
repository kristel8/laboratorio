
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function rangeStockValidator(stockActual: string): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const valueEnvio = control.value;

        if (!valueEnvio) {
            return null;
        }

        console.log(+valueEnvio)
        console.log(+stockActual)

        const valid = stockActual >= valueEnvio;
        console.log(valid)
        return !valid ? {stockValid:true}: null;
    }
}
