import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.error = '';
    this.loading = true;
    this.auth.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.error = err.status === 409 ? 'Email já cadastrado.' : 'Erro ao criar conta. Tente novamente.';
        this.loading = false;
      }
    });
  }
}
