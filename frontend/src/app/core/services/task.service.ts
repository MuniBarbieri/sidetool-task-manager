import { Injectable } from '@angular/core';
import { TaskApiService } from './task-api.service';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { Task } from '../models/task.model';
import { LoadingService } from './loading.service';
import { ToastService } from './toast.service';
import { UpdateToFavoriteParams } from '../models/request-params/update-to-favorite-params';
import { CreateTaskParams } from '../models/request-params/create-task-params';
import { UpdateTaskParams } from '../models/request-params/update-task-params';
import { TASK_ERROR_MESSAGES, TASK_SUCCESS_MESSAGES } from '../constants/messages';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _tasks$ = new BehaviorSubject<Task[]>([]);
  private readonly _searchTerm$ = new BehaviorSubject<string>('');
  private readonly _isFavoritesPage$ = new BehaviorSubject<boolean>(false);
  private readonly _hasError$ = new BehaviorSubject<boolean>(false);
  readonly isReadyToRender$: Observable<{ notLoading: boolean; hasTasks: boolean }>;
  readonly loading$: Observable<boolean>;
  readonly tasks$ = this._tasks$.asObservable();
  readonly searchTerm$ = this._searchTerm$.asObservable().pipe(
    debounceTime(200),
    distinctUntilChanged()
  );
  readonly hasError$ = this._hasError$.asObservable();
  private taskCount = 0;

  constructor(
    private taskApiService: TaskApiService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {
    this.loading$ = this.loadingService.loading$;
    this.isReadyToRender$ = combineLatest([
      this.loading$.pipe(map(loading => !loading)),
      this.hasTasks$
    ]).pipe(
      map(([notLoading, hasTasks]) => ({ notLoading, hasTasks }))
    );
  }

  setFavoritesContext(isFavorites: boolean): void {
    this._isFavoritesPage$.next(isFavorites);
  }

  setSearchTerm(term: string): void {
    this._searchTerm$.next(term);
  }

  loadTasks(): Observable<Task[]> {
    const shouldFetch = this._tasks$.value.length === 0 || this.taskCount !== this._tasks$.value.length;

    if (!shouldFetch) return this.tasks$;

    this.loadingService.start();

    return this.taskApiService.fetchTasks().pipe(
      tap(tasks => {
        this._tasks$.next(tasks);
        this.taskCount = tasks.length;
        this._hasError$.next(false);
        this.loadingService.stop();
      }),
      catchError(err => {
        this._hasError$.next(true);
        this.loadingService.stop();
        return of([]);
      })
    );
  }

  updateFavorite({ id, favorite }: UpdateToFavoriteParams): Observable<Task> {
    return this.taskApiService.updateTaskFavorite(id, favorite).pipe(
      tap(updated => {
        const updatedTasks = this._tasks$.value.map(t =>
          t.id === updated.id ? updated : t
        );
        this._tasks$.next(updatedTasks);
        this.toastService.show(TASK_SUCCESS_MESSAGES.updateFavoriteSuccess);
      }),
      catchError(err => {
        this.toastService.show(TASK_ERROR_MESSAGES.updateFavoriteError);
        return of();
      })
    );
  }

  submitTask(isEdit: boolean, task: UpdateTaskParams | CreateTaskParams, id?: string, ): Observable<Task> {
    this.loadingService.start();

    const action$ = isEdit && id
      ? this.taskApiService.updateTask(id, task)
      : this.taskApiService.createTask(task);

    return action$.pipe(
      tap((result: Task) => this.updateTaskStateAndNotify(result, isEdit, id)),
      catchError(err => this.notifySubmissionFailure(err, isEdit))
    );
  }

  deleteTaskWithFeedback(taskId: string): Observable<Task> {
    this.loadingService.start();

    return this.taskApiService.deleteTask(taskId).pipe(
      tap(() => {
        const filtered = this._tasks$.value.filter(task => task.id !== taskId);
        this._tasks$.next(filtered);

        this.toastService.show(TASK_SUCCESS_MESSAGES.deleteSuccess);
        this.loadingService.stop();
      }),
      catchError(err => {
        this.toastService.show(TASK_ERROR_MESSAGES.deleteError);
        this.loadingService.stop();
        return of();
      })
    );
  }

  readonly filteredTasks$ = combineLatest([this.tasks$, this.searchTerm$]).pipe(
    map(([tasks, term]) =>
      tasks.filter(task =>
        task.title.toLowerCase().includes(term.toLowerCase())
      )
    )
  );

  readonly filteredTodoTasks$ = combineLatest([
    this.filteredTasks$,
    this._isFavoritesPage$
  ]).pipe(
    map(([tasks, isFav]) =>
      tasks.filter(t => !t.completed && (!isFav || t.favorite))
    )
  );

  readonly filteredDoneTasks$ = combineLatest([
    this.filteredTasks$,
    this._isFavoritesPage$
  ]).pipe(
    map(([tasks, isFav]) =>
      tasks.filter(t => t.completed && (!isFav || t.favorite))
    )
  );

  readonly hasTasks$ = combineLatest([
    this.filteredTodoTasks$,
    this.filteredDoneTasks$
  ]).pipe(
    map(([todo, done]) => todo.length > 0 || done.length > 0)
  );

  private updateTaskStateAndNotify(result: Task, isEdit: boolean, id?: string): void {
    if (isEdit && id) {
      const updatedTasks = this._tasks$.value.map(t =>
        t.id === id ? result : t
      );
      this._tasks$.next(updatedTasks);
    } else {
      this._tasks$.next([...this._tasks$.value, result]);
    }

    const message = isEdit
      ? TASK_SUCCESS_MESSAGES.updateSuccess
      : TASK_SUCCESS_MESSAGES.createSuccess;

    this.toastService.show(message);
    this.loadingService.stop();
  }

  private notifySubmissionFailure(error: any, isEdit: boolean): Observable<never> {
    const message = isEdit
      ? TASK_ERROR_MESSAGES.updateError
      : TASK_ERROR_MESSAGES.createError;

    this.toastService.show(message);
    this.loadingService.stop();
    console.error(message, error);
    return of();
  }
}
