import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private _httpClient: HttpClient) {}

  fetchTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(`${this.apiUrl}`);
  }

  createTask(task: Task): Observable<Task> {
    return this._httpClient.post<Task>(`${this.apiUrl}`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this._httpClient.patch<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(taskId: string): Observable<Task> {
    return this._httpClient.delete<Task>(`${this.apiUrl}/${taskId}`);
  }
}
