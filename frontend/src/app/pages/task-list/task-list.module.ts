import { NgModule } from '@angular/core';
import { taskListRouting } from './task-list-routing';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list.component';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { TaskEditDialogComponent } from '../../components/task-edit-dialog/task-edit-dialog.component';
import { AddTaskFormComponent } from '../../components/add-task-form/add-task-form.component';

@NgModule({
  imports: [
    RouterModule.forChild(taskListRouting),
    CommonModule,
  ],
  declarations: [TaskListComponent,TaskCardComponent, TaskEditDialogComponent],
  exports: []
})
export class TaskListModule {}
