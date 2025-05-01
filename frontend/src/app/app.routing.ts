import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

export const appRoutes: Routes = [
  // 🔁 Redirección desde raíz a /auth
  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // Ruta sin layout
  // { path: 'auth', component: AuthComponent },

  // Ruta con layout aplicado
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'tasks', component: TaskListComponent }
    ]
  }
];


