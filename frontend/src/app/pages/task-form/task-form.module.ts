import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { taskFormRouting } from './task-form.routing';
import { TaskFormComponent } from './task-form.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild(taskFormRouting),
    SharedModule,
    AsyncPipe,
    NgIf,
  ],
  declarations: [TaskFormComponent],
  exports: []
})
export class TaskFormModule {}
