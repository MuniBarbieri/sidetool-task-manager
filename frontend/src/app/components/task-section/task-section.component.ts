import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-section',
  standalone: false,
  templateUrl: './task-section.component.html',
})
export class TaskSectionComponent {
  @Input() title!: string;
  @Input() tasks$!: Observable<Task[]>;
  @Output() edit = new EventEmitter<Task>();
}
