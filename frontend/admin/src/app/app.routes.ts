import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { AppLayoutComponent } from './layout/app-layout.component';

export const routes: Routes = [
  // Публичная страница логина (без хедера/сайдбара)
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/auth-login.component').then((m) => m.AuthLoginComponent),
  },

  // Защищённое дерево ПОД оболочкой (хедер + сайдбар здесь!)
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },

      // Раскомментируй/добавь свои страницы по мере необходимости:
      // {
      //   path: 'projects',
      //   loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
      // },
      // {
      //   path: 'all-pipelines',
      //   loadComponent: () => import('./pages/all-pipelines/all-pipelines.component').then(m => m.AllPipelinesComponent),
      // },
      // {
      //   path: 'settings',
      //   loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
      // },
      // {
      //   path: 'help',
      //   loadComponent: () => import('./pages/help/help.component').then(m => m.HelpComponent),
      // },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];

