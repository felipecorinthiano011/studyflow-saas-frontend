import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'study-items',
    loadComponent: () => import('./pages/study-items/study-items').then(m => m.StudyItemsComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login' }
];
