import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/task-list/task-list.module').then(m => m.TaskListModule)
      },
      {
        path: 'tasks/new',
        loadChildren: () =>
          import('./pages/task-form/task-form.module').then(m => m.TaskFormModule)
      }
    ]
  },
];

