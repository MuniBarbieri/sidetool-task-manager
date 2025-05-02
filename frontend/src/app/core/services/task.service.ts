import { Injectable } from '@angular/core';
import { TaskApiService } from './task-api.service';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks$ = new BehaviorSubject<Task[]>([]);
  private _searchTerm$ = new BehaviorSubject<string>('');

  numberOfTasks:number = 0;

  constructor(private taskApiService: TaskApiService) {}

  get tasks$(): Observable<Task[]> {
    return this._tasks$.asObservable();
  }

  get tasks(): Task[] {
    return this._tasks$.value;
  }

  set tasks(tasks: Task[]) {
    this._tasks$.next(tasks);
  }

  setSearchTerm(term: string) {
    this._searchTerm$.next(term);
  }

  loadTasks(): Observable<Task[]> {
    if(this.tasks.length === 0 || this.numberOfTasks !== this.tasks.length) {
      return this.taskApiService.fetchTasks().pipe(
        tap(tasks => {
          this.tasks = tasks;
          this.numberOfTasks = tasks.length;
        }),
      );
    }
    return this.tasks$
  }

  createTask(task: Task): Observable<Task> {
    return this.taskApiService.createTask(task).pipe(
      tap(newTask => this.tasks = [...this.tasks, newTask]),
    );
  }

  updateTask(taskParams: Task): Observable<Task> {
    return this.taskApiService.updateTask(taskParams).pipe(
      tap(updatedTask => {
        this.tasks = this.tasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
      }),
    );
  }

  deleteTask(taskId: string): Observable<Task> {
    return this.taskApiService.deleteTask(taskId).pipe(
      tap(() => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      }),
    );
  }

  getFilteredTasks(): Observable<Task[]> {
    return combineLatest([
      this.tasks$,
      this._searchTerm$.asObservable().pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
    ]).pipe(
      map(([tasks, term]) =>
        tasks.filter(task =>
          task.title.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  getFilteredTodoTasks(): Observable<Task[]> {
    return this.getFilteredTasks().pipe(
      map(tasks => tasks.filter(t => !t.completed))
    );
  }

  getFilteredDoneTasks(): Observable<Task[]> {
    return this.getFilteredTasks().pipe(
      map(tasks => tasks.filter(t => t.completed))
    );
  }
}
