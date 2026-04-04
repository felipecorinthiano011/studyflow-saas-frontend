import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private toastService = inject(ToastService);

  handleError(error: unknown): void {
    const message = this.extractMessage(error);
    this.toastService.showError(message);
    console.error('[GlobalErrorHandler]', error);
  }

  private extractMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message || 'Ocorreu um erro inesperado.';
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Ocorreu um erro inesperado.';
  }
}

