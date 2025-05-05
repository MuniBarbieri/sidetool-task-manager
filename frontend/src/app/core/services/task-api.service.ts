import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { CreateTaskParams } from '../models/request-params/create-task-params';
import { UpdateTaskParams } from '../models/request-params/update-task-params';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private _httpClient: HttpClient) {}

  fetchTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(`${this.apiUrl}`);
  }

  createTask(createTaskParams: CreateTaskParams): Observable<Task> {
    return this._httpClient.post<Task>(`${this.apiUrl}`, createTaskParams);
  }

  updateTask(taskId:string, updateTaskParams: UpdateTaskParams): Observable<Task> {
    return this._httpClient.patch<Task>(`${this.apiUrl}/${taskId}`, updateTaskParams);
  }

  updateTaskFavorite(taskId: string, favorite: boolean): Observable<Task> {
    return this._httpClient.patch<Task>(`${this.apiUrl}/${taskId}/favorite`, { favorite });
  }

  deleteTask(taskId: string): Observable<Task> {
    return this._httpClient.delete<Task>(`${this.apiUrl}/${taskId}`);
  }
}
