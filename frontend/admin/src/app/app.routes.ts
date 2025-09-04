import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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

