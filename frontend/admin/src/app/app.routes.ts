import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
  },
  {
    path: 'project-detail/:id',
    loadComponent: () =>
      import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
  },
  {
    path: 'all-pipelines',
    loadComponent: () =>
      import('./pages/all-pipelines/all-pipelines.component').then(m => m.AllPipelinesComponent),
  },
  {
    path: 'pipeline-detail/:id',
    loadComponent: () =>
      import('./pages/pipeline-detail/pipeline-detail.component').then(m => m.PipelineDetailComponent),
  },
  {
    path: 'runs',
    loadComponent: () =>
      import('./pages/runs/runs.component').then(m => m.RunsComponent),
  },
  {
    path: 'create-project',
    loadComponent: () =>
      import('./pages/create-project/create-project.component').then(m => m.CreateProjectComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component').then(m => m.SettingsComponent),
  },
  {
    path: 'help',
    loadComponent: () =>
      import('./pages/help/help.component').then(m => m.HelpComponent),
  },
  {
    path: 'dashboard-stats',
    loadComponent: () =>
      import('./pages/dashboard-stats/dashboard-stats.component').then(m => m.DashboardStatsComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' },
];

