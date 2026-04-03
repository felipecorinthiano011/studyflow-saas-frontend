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
    if (!this.title.trim()) return;
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

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
