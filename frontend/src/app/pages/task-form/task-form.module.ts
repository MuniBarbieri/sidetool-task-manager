import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { taskFormRouting } from './task-form.routing';
import { TaskFormComponent } from './task-form.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule.forChild(taskFormRouting),
    CommonModule,
  ],
  declarations: [TaskFormComponent],
  exports: []
})
export class TaskFormModule {}
