import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 min-w-72 max-w-sm">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm animate-fade-in"
          [class]="toastClass(toast)">
          <span class="flex-1">{{ toast.message }}</span>
          <button
            (click)="toastService.dismiss(toast.id)"
            class="text-white/80 hover:text-white font-bold text-lg leading-none ml-2">
            ✕
          </button>
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  readonly toastService = inject(ToastService);

  toastClass(toast: Toast): string {
    const base = 'transition-all duration-300';
    const colors: Record<Toast['type'], string> = {
      success: 'bg-green-600',
      error: 'bg-red-600',
      info: 'bg-blue-600'
    };
    return `${base} ${colors[toast.type]}`;
  }
}

