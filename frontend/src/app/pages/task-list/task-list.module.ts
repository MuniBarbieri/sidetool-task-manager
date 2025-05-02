import { NgModule } from '@angular/core';
import { taskListRouting } from './task-list-routing';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list.component';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule.forChild(taskListRouting),
    CommonModule,
  ],
  declarations: [TaskListComponent,TaskCardComponent],
  exports: []
})
export class TaskListModule {}
