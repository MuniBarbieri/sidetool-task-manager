import { Injectable } from '@angular/core';
import { TaskApiService } from './task-api.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks$ = new BehaviorSubject<Task[]>([]);

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

  loadTasks(): Observable<Task[]> {
    return this.taskApiService.fetchTasks().pipe(
      tap(tasks => this.tasks = tasks),
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.taskApiService.createTask(task).pipe(
      tap(newTask => this.tasks = [...this.tasks, newTask]),
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskApiService.updateTask(task).pipe(
      tap(updatedTask => {
        this.tasks = this.tasks.map(t =>
          t.id === updatedTask.id ? updatedTask : t
        );
      }),
    );
  }

  deleteTask(taskId: string): Observable<Task> {
    return this.taskApiService.deleteTask(taskId).pipe(
      tap(() => {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
      }),
    );
  }

  getTodoTasks(): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(t => !t.completed))
    );
  }

  getDoneTasks(): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(t => t.completed))
    );
  }
}
