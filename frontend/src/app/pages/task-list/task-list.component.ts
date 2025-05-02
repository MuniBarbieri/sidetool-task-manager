import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';
import { Observable } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  todoTasks$!: Observable<Task[]>;
  doneTasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;

  constructor(
    private taskService: TaskService,
    private loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.loadingService.start();
    this.taskService.loadTasks().subscribe({
      next: () => this.loadingService.stop(),
      error: () => this.loadingService.stop(),
    });
    this.todoTasks$ = this.taskService.getTodoTasks();
    this.doneTasks$ = this.taskService.getDoneTasks();
  }
}
