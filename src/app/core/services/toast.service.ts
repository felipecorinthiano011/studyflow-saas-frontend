import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;
  readonly toasts = signal<Toast[]>([]);

  showSuccess(message: string): void {
    this.add(message, 'success');
  }

  showError(message: string): void {
    this.add(message, 'error');
  }

  showInfo(message: string): void {
    this.add(message, 'info');
  }

  dismiss(id: number): void {
    this.toasts.update(t => t.filter(x => x.id !== id));
  }

  private add(message: string, type: Toast['type']): void {
    const id = ++this.counter;
    this.toasts.update(t => [...t, { id, message, type }]);
    setTimeout(() => this.dismiss(id), 4000);
  }
}

