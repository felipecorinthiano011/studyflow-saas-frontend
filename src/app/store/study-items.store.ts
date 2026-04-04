import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { StudyItem, StudyItemService } from '../services/study-item.service';

interface StudyItemsState {
  items: StudyItem[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

const initialState: StudyItemsState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  last: true
};

export const StudyItemsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, service = inject(StudyItemService)) => ({
    loadItems(page = 0): void {
      patchState(store, { loading: true, error: null });
      service.getAll(page).subscribe({
        next: res => patchState(store, {
          items: res.content,
          loading: false,
          currentPage: res.page,
          totalPages: res.totalPages,
          totalElements: res.totalElements,
          last: res.last
        }),
        error: () => patchState(store, { loading: false, error: 'Erro ao carregar itens.' })
      });
    },
    addOptimistic(item: StudyItem): void {
      patchState(store, { items: [item, ...store.items()] });
    },
    replaceOptimistic(tempId: number, real: StudyItem): void {
      patchState(store, {
        items: store.items().map(i => i.id === tempId ? real : i)
      });
    },
    removeById(id: number): void {
      patchState(store, { items: store.items().filter(i => i.id !== id) });
    },
    restoreItems(items: StudyItem[]): void {
      patchState(store, { items });
    },
    clearAll(): void {
      patchState(store, { items: [] });
    },
    setError(error: string | null): void {
      patchState(store, { error });
    }
  }))
);
