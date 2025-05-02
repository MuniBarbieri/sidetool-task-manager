import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task-edit-dialog',
  standalone: false,
  templateUrl: './task-edit-dialog.component.html',
  styleUrl: './task-edit-dialog.component.scss'
})
export class TaskEditDialogComponent {
  @Input() task!: Task;
  @Output() closeDialog = new EventEmitter<void>();
  isClosing = false;

  close() {
    this.isClosing = true;
    setTimeout(() => this.closeDialog.emit(), 300);
  }

  onTaskUpdated(updatedTask: Task) {
    this.close();
  }
}
