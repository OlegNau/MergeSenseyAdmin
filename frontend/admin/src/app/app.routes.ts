import { Routes } from '@angular/router';
import { authGuard } from '@abp/ng.core';

export const routes: Routes = [
  // Public auth routes (no guard)
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/auth-login.component').then(m => m.AuthLoginComponent),
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./auth/auth-callback.component').then(m => m.AuthCallbackComponent),
  },
  {
    path: 'auth/logout',
    loadComponent: () => import('./auth/auth-logout.component').then(m => m.AuthLogoutComponent),
  },
  {
    path: 'auth/logged-out',
    loadComponent: () => import('./auth/auth-loggedout.component').then(m => m.AuthLoggedOutComponent),
  },
  {
    path: 'auth/forbidden',
    loadComponent: () => import('./auth/auth-forbidden.component').then(m => m.AuthForbiddenComponent),
  },

  // Guarded shell
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/app-layout.component').then(m => m.AppLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'dashboard-stats',
        loadComponent: () =>
          import('./pages/dashboard-stats/dashboard-stats.component').then(
            m => m.DashboardStatsComponent,
          ),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
      },
      {
        path: 'projects/new',
        loadComponent: () =>
          import('./pages/create-project/create-project.component').then(
            m => m.CreateProjectComponent,
          ),
      },
      // Modal via named outlet (must stay between /projects/new and /projects/:id)
      {
        path: 'projects/:projectId/pipelines/new',
        outlet: 'modal',
        loadComponent: () =>
          import('./pages/pipeline-create-modal/pipeline-create-modal.component').then(
            m => m.PipelineCreateModalComponent,
          ),
      },
      {
        path: 'projects/:id',
        loadComponent: () =>
          import('./pages/project-detail/project-detail.component').then(
            m => m.ProjectDetailComponent,
          ),
      },
      {
        path: 'all-pipelines',
        loadComponent: () =>
          import('./pages/all-pipelines/all-pipelines.component').then(
            m => m.AllPipelinesComponent,
          ),
      },
      {
        path: 'pipelines/:id',
        loadComponent: () =>
          import('./pages/pipeline-detail/pipeline-detail.component').then(
            m => m.PipelineDetailComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            m => m.SettingsComponent,
          ),
      },
      {
        path: 'help',
        loadComponent: () =>
          import('./pages/help/help.component').then(m => m.HelpComponent),
      },
      {
        path: '404',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(
            m => m.NotFoundComponent,
          ),
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: '**', redirectTo: '404' },
    ],
  },
];
