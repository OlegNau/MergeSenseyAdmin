import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  // Публичная страница логина (кнопка запускает интерактивный логин)
  { path: 'auth/login', loadComponent: () => import('./auth/auth-login.component').then(m => m.AuthLoginComponent) },

  // Защищённое дерево
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      // при необходимости: { path: 'projects', ... }, { path: 'all-pipelines', ... } и т.д.
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
