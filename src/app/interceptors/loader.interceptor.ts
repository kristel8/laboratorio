import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private activeRequests: number = 0;

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Incrementar el contador de solicitudes activas
    this.activeRequests++;
    this.loaderService.show(); // Mostrar el loader
debugger
console.log(request);
    return next.handle(request).pipe(
      finalize(() => {
        // Decrementar el contador y ocultar el loader si no hay solicitudes activas
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loaderService.hide(); // Ocultar el loader
        }
      })
    );
  }
}
