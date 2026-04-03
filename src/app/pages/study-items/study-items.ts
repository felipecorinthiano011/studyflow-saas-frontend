import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudyItem, StudyItemService } from '../../services/study-item.service';
import { AuthService } from '../../services/auth.service';

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
  loading = false;
  error = '';

  editingId: number | null = null;
  editTitle = '';
  editDescription = '';

  constructor(
    private studyItemService: StudyItemService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.studyItemService.getAll().subscribe({
      next: items => this.items = items,
      error: () => this.error = 'Erro ao carregar itens.'
    });
  }

  onCreate(): void {
    if (!this.title.trim() || !this.description.trim()) return;
    this.loading = true;
    this.studyItemService.create(this.title, this.description).subscribe({
      next: item => {
        this.items.unshift(item);
        this.title = '';
        this.description = '';
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao criar item.';
        this.loading = false;
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
    this.loading = true;
    this.studyItemService.update(this.editingId, this.editTitle, this.editDescription).subscribe({
      next: updated => {
        const index = this.items.findIndex(i => i.id === updated.id);
        if (index !== -1) this.items[index] = updated;
        this.editingId = null;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao atualizar item.';
        this.loading = false;
      }
    });
  }

  onDelete(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;
    this.studyItemService.delete(id).subscribe({
      next: () => this.items = this.items.filter(i => i.id !== id),
      error: () => this.error = 'Erro ao excluir item.'
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
