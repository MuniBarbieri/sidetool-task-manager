import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';
import { FormControl } from '@angular/forms';

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
  selectedTask: Task | null = null;
  searchTask = '';

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

    const filteredTasks$ = combineLatest([
      this.taskService.tasks$,
      new FormControl('').valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([tasks, term]) =>
        tasks.filter(task =>
          task.title.toLowerCase().includes(term!.toLowerCase())
        )
      )
    );

    this.todoTasks$ = combineLatest([filteredTasks$, new FormControl('').valueChanges.pipe(startWith(''))]).pipe(
      map(([tasks]) => tasks.filter(t => !t.completed))
    );

    this.doneTasks$ = combineLatest([filteredTasks$, new FormControl('').valueChanges.pipe(startWith(''))]).pipe(
      map(([tasks]) => tasks.filter(t => t.completed))
    );
  }

  onEditTask(task: Task) {
    this.selectedTask = task;
  }

  closeDialog(closeEvent: any) {
    this.selectedTask = null;
  }
}
