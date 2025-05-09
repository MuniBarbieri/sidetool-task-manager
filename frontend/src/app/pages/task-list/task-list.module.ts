import { NgModule } from '@angular/core';
import { taskListRouting } from './task-list-routing';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list.component';
import { NgOptimizedImage } from '@angular/common';
import { TaskEditDialogComponent } from '../../components/task-edit-dialog/task-edit-dialog.component';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild(taskListRouting),
    SharedModule,
    NgOptimizedImage,
  ],
  declarations: [TaskListComponent, TaskEditDialogComponent],
  exports: []
})
export class TaskListModule {}
