import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: false,
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}
  toggleEdit() {
    this.edit.emit(this.task);
  }



  toggleFavorite(task: Task): void {
    this.taskService.updateFavoriteStatus(task).subscribe();
  }
}
