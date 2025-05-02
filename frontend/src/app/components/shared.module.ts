import { NgModule } from '@angular/core';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddTaskFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AddTaskFormComponent]
})
export class SharedModule {}
