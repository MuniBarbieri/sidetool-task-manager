import { NgModule } from '@angular/core';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskSectionComponent } from './task-section/task-section.component';
import { TaskCardComponent } from './task-card/task-card.component';

@NgModule({
  declarations: [AddTaskFormComponent, TaskSectionComponent, TaskCardComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AddTaskFormComponent, TaskSectionComponent, TaskCardComponent],
})
export class SharedModule {}
