import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  todoTasks$!: Observable<Task[]>;
  doneTasks$!: Observable<Task[]>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.loadTasks();
    this.todoTasks$ = this.taskService.getTodoTasks();
    this.doneTasks$ = this.taskService.getDoneTasks();
  }
}
