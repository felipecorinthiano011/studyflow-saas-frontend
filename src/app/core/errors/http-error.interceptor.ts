import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = error.error?.message
        || error.error?.error
        || `Erro ${error.status}: ${error.statusText}`;

      if (error.status !== 401) {
        toastService.showError(message);
      }

      return throwError(() => error);
    })
  );
};

