import { NgModule } from '@angular/core';
import { taskListRouting } from './task-list-routing';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TaskEditDialogComponent } from '../../components/task-edit-dialog/task-edit-dialog.component';
import { SharedModule } from '../../components/shared.module';
import { FormsModule } from '@angular/forms';
import { FilterTasksPipe } from '../../shared/filter-tasks.pipe';

@NgModule({
  imports: [
    RouterModule.forChild(taskListRouting),
    CommonModule,
    SharedModule,
    FormsModule,
    FilterTasksPipe,
    NgOptimizedImage,
  ],
  declarations: [TaskListComponent, TaskEditDialogComponent],
  exports: []
})
export class TaskListModule {}
