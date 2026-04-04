import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudyItem, StudyItemService } from '../../services/study-item.service';
import { AuthService, UserProfile } from '../../services/auth.service';
import { StudyItemsStore } from '../../store/study-items.store';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-study-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './study-items.html'
})
export class StudyItemsComponent implements OnInit {
  protected readonly store = inject(StudyItemsStore);
  private readonly studyItemService = inject(StudyItemService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  title = '';
  description = '';
  saving = false;
  editingId: number | null = null;
  editTitle = '';
  editDescription = '';
  currentUser: UserProfile | null = null;

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.store.loadItems();
  }

  get items(): StudyItem[] { return this.store.items(); }
  get loadingItems(): boolean { return this.store.loading(); }

  onCreate(): void {
    if (!this.title.trim() || !this.description.trim()) return;

    const tempId = -Date.now();
    const optimisticItem: StudyItem = {
      id: tempId, title: this.title,
      description: this.description, createdAt: new Date().toISOString()
    };
    this.store.addOptimistic(optimisticItem);
    const savedTitle = this.title;
    const savedDesc = this.description;
    this.title = '';
    this.description = '';

    this.studyItemService.create(savedTitle, savedDesc).subscribe({
      next: item => this.store.replaceOptimistic(tempId, item),
      error: () => {
        this.store.removeById(tempId);
        this.title = savedTitle;
        this.description = savedDesc;
        this.toast.showError('Erro ao criar item. Tente novamente.');
      }
    });
  }

  startEdit(item: StudyItem): void {
    this.editingId = item.id;
    this.editTitle = item.title;
    this.editDescription = item.description;
  }

  cancelEdit(): void { this.editingId = null; }

  onUpdate(): void {
    if (!this.editTitle.trim() || !this.editDescription.trim() || this.editingId === null) return;
    this.saving = true;
    this.studyItemService.update(this.editingId, this.editTitle, this.editDescription).subscribe({
      next: updated => {
        this.store.replaceOptimistic(updated.id, updated);
        this.editingId = null;
        this.saving = false;
        this.toast.showSuccess('Item atualizado!');
      },
      error: () => {
        this.saving = false;
        this.toast.showError('Erro ao atualizar item.');
      }
    });
  }

  onDelete(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;
    const removed = this.items.find(i => i.id === id);
    this.store.removeById(id);
    this.studyItemService.delete(id).subscribe({
      error: () => {
        if (removed) this.store.addOptimistic(removed);
        this.toast.showError('Erro ao excluir item.');
      }
    });
  }

  onDeleteAll(): void {
    if (this.items.length === 0) return;
    if (!confirm(`Excluir todos os ${this.items.length} itens? Esta ação não pode ser desfeita.`)) return;
    const backup = [...this.items];
    this.store.clearAll();
    this.studyItemService.deleteAll().subscribe({
      next: () => this.toast.showSuccess('Todos os itens foram excluídos.'),
      error: () => {
        this.store.restoreItems(backup);
        this.toast.showError('Erro ao excluir todos os itens.');
      }
    });
  }

  loadPage(page: number): void {
    this.store.loadItems(page);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
