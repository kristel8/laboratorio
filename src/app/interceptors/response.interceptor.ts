import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MensajesSwalService } from '../shared/services/mensajes-swal.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private readonly servicioMensajesSwal: MensajesSwalService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const body = event.body;
          if (body && typeof body === 'object') {
            const endpointsExcluded = ['getAllActive', 'findById', 'setInactive', 'insert/usuario']
            if (!endpointsExcluded.some(endpoint => req.url.includes(endpoint))) {
              if (body.error) {
                this.servicioMensajesSwal.mensajeError(body.mensaje);
              } else {
                this.servicioMensajesSwal.mensajeExito(body.mensaje);
              }

              return event;
            }
            console.log(body);
            if (body.data) {
              return event.clone({ body: body.data });
            }

            return event;
          }
        }
        return event;
      }),
      catchError((error) => {
        if (error.error && error.error.mensaje) {
          this.servicioMensajesSwal.mensajeError(error.error.mensaje);
        }
        return throwError(error);
      })
    );
  }
}
