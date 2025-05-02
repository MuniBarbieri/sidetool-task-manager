import { Injectable } from '@angular/core';
import { TaskApiService } from './task-api.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks$ = new BehaviorSubject<Task[]>([]);

  constructor(public taskApiService:TaskApiService) {}

  loadTasks(): Observable<Task[]> {
   return this.taskApiService.fetchTasks().pipe(
      tap(tasks => this._tasks$.next(tasks)),
    );
  }

  get tasks$(): Observable<Task[]> {
    return this._tasks$.asObservable();
  }

  getTodoTasks(): Observable<Task[]> {
    return this.tasks$.pipe(map(tasks => tasks.filter(t => t.completed)));
  }

  getDoneTasks(): Observable<Task[]> {
    return this.tasks$.pipe(map(tasks => tasks.filter(t => !t.completed)));
  }
}
