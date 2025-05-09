import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { taskFormRouting } from './task-form.routing';
import { TaskFormComponent } from './task-form.component';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild(taskFormRouting),
    SharedModule,
  ],
  declarations: [TaskFormComponent],
  exports: []
})
export class TaskFormModule {}
