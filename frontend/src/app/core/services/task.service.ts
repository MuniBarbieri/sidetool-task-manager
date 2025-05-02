import { Injectable } from '@angular/core';
import { TaskApiService } from './task-api.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks$ = new BehaviorSubject<Task[]>([]);
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

  getTodoTasks(): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => !task.completed))
    );
  }

  getDoneTasks(): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.completed))
    );
  }
}
