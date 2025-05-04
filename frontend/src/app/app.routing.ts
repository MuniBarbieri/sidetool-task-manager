import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tasks',
        loadChildren: () =>
          import('./pages/task-list/task-list.module').then(m => m.TaskListModule)
      },
      {
        path: 'tasks/new',
        loadChildren: () =>
          import('./pages/task-form/task-form.module').then(m => m.TaskFormModule)
      },
    ]
  },
];

