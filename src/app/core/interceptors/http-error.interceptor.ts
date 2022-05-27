import {
  HttpErrorResponse,
  HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/shared/client-services';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) { }

  isRefreshing = false;
  errorMessage: string = '';
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 400:
              this.errorService.handle400Error(error);
              break;

            case 401:
              this.errorService.handle401Error(error);
              break;

            case 403:
              this.errorService.handle403Error(error);
              break;

            case 405:
              this.errorService.handle405Error(error);
              break;

            case 409:
              this.errorService.handle409Error(error);
              break;

            case 500:
              this.errorService.handle500Error(error);
              break;

            default:
              console.error('Not considered HTTP error');
              console.error(error);
              break;
          }

          if (error.error instanceof ErrorEvent) {
            console.error('ErrorEvent occurred');
          }
        } else {
          console.error('Not HTTP error');
          console.error(error);
        }

        return throwError(error);
      })
    );
  }

}
