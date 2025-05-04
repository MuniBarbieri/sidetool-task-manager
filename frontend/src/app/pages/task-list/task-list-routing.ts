import { Routes } from '@angular/router';

import { TaskListComponent } from './task-list.component';

export const taskListRouting: Routes = [
  {
    path: '',
    component: TaskListComponent,
  },
  { path: 'favorite', component: TaskListComponent }
];
