import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { taskFormRouting } from './task-form.routing';
import { TaskFormComponent } from './task-form.component';
import { CommonModule } from '@angular/common';
import { AddTaskFormComponent } from '../../components/add-task-form/add-task-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule.forChild(taskFormRouting),
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [TaskFormComponent, AddTaskFormComponent],
  exports: [AddTaskFormComponent]
})
export class TaskFormModule {}
