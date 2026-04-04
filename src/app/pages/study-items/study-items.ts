import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudyItem, StudyItemService } from '../../services/study-item.service';
import { AuthService, UserProfile } from '../../services/auth.service';

@Component({
  selector: 'app-study-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './study-items.html'
})
export class StudyItemsComponent implements OnInit {
  items: StudyItem[] = [];
  title = '';
  description = '';
  saving = false;
  loadingItems = true;
  error = '';

  editingId: number | null = null;
  editTitle = '';
  editDescription = '';

  currentUser: UserProfile | null = null;

  constructor(
    private studyItemService: StudyItemService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.loadItems();
  }

  loadItems(): void {
    this.loadingItems = true;
    this.studyItemService.getAll().subscribe({
      next: items => {
        this.items = items;
        this.loadingItems = false;
      },
      error: () => {
        this.error = 'Erro ao carregar itens.';
        this.loadingItems = false;
      }
    });
  }

  onCreate(): void {
    if (!this.title.trim() || !this.description.trim()) return;

    // Optimistic update: exibe o item imediatamente na UI
    const tempId = -Date.now();
    const optimisticItem: StudyItem = {
      id: tempId,
      title: this.title,
      description: this.description,
      createdAt: new Date().toISOString()
    };
    this.items.unshift(optimisticItem);
    const savedTitle = this.title;
    const savedDesc = this.description;
    this.title = '';
    this.description = '';

    this.studyItemService.create(savedTitle, savedDesc).subscribe({
      next: item => {
        // Substitui o item temporário pelo real retornado do servidor
        const idx = this.items.findIndex(i => i.id === tempId);
        if (idx !== -1) this.items[idx] = item;
      },
      error: () => {
        // Rollback: remove o item otimista e restaura o formulário
        this.items = this.items.filter(i => i.id !== tempId);
        this.title = savedTitle;
        this.description = savedDesc;
        this.error = 'Erro ao criar item. Tente novamente.';
      }
    });
  }

  startEdit(item: StudyItem): void {
    this.editingId = item.id;
    this.editTitle = item.title;
    this.editDescription = item.description;
  }

  cancelEdit(): void {
    this.editingId = null;
  }

  onUpdate(): void {
    if (!this.editTitle.trim() || !this.editDescription.trim() || this.editingId === null) return;
    this.saving = true;
    this.studyItemService.update(this.editingId, this.editTitle, this.editDescription).subscribe({
      next: updated => {
        const idx = this.items.findIndex(i => i.id === updated.id);
        if (idx !== -1) this.items[idx] = updated;
        this.editingId = null;
        this.saving = false;
      },
      error: () => {
        this.error = 'Erro ao atualizar item.';
        this.saving = false;
      }
    });
  }

  onDelete(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;
    const removed = this.items.find(i => i.id === id);
    this.items = this.items.filter(i => i.id !== id);
    this.studyItemService.delete(id).subscribe({
      error: () => {
        if (removed) this.items.push(removed);
        this.error = 'Erro ao excluir item.';
      }
    });
  }

  onDeleteAll(): void {
    if (this.items.length === 0) return;
    if (!confirm(`Tem certeza que deseja excluir todos os ${this.items.length} itens? Esta ação não pode ser desfeita.`)) return;
    const backup = [...this.items];
    this.items = [];
    this.studyItemService.deleteAll().subscribe({
      error: () => {
        this.items = backup;
        this.error = 'Erro ao excluir todos os itens.';
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
