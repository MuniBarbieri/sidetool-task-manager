import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  todoTasks$!: Observable<Task[]>;
  doneTasks$!: Observable<Task[]>;
  isReadyToRender$!: Observable<{ notLoading: boolean; hasTasks: boolean }>;
  selectedTask: Task | null = null;
  searchValue = '';

  constructor(
    public taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.loadTasks().subscribe();
    this.detectFavoritesContext();

    this.todoTasks$ = this.taskService.filteredTodoTasks$;
    this.doneTasks$ = this.taskService.filteredDoneTasks$;
    this.isReadyToRender$ = this.taskService.isReadyToRender$;
  }

  private detectFavoritesContext(): void {
    const isFavoritesPage = this.router.url.includes('favorite');
    this.taskService.setFavoritesContext(isFavoritesPage);
  }

  onSearch(term: string): void {
    this.taskService.setSearchTerm(term);
  }

  onEditTask(task: Task): void {
    this.selectedTask = task;
  }

  closeDialog(_: unknown): void {
    this.selectedTask = null;
  }
}

