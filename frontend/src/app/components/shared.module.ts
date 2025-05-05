import { NgModule } from '@angular/core';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskSectionComponent } from './task-section/task-section.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { LucideAngularModule, icons } from 'lucide-angular';
import { SkeletonTaskCardComponent } from './skeleton-task-card/skeleton-task-card.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { SkeletonTaskFormComponent } from './skeleton-task-form/skeleton-task-form.component';
import { PriorityBadgeComponent } from './priority-badge/priority-badge.component';

@NgModule({
  declarations: [AddTaskFormComponent, TaskSectionComponent, TaskCardComponent, SkeletonTaskCardComponent, LoadingBarComponent, SkeletonTaskFormComponent, PriorityBadgeComponent],
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule.pick(icons)],
  exports: [AddTaskFormComponent, TaskSectionComponent, TaskCardComponent,LucideAngularModule, SkeletonTaskCardComponent, LoadingBarComponent, SkeletonTaskFormComponent, PriorityBadgeComponent],
})
export class SharedModule {}
