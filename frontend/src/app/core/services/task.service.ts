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
    private loadingService: LoadingService
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
    if (this._tasks$.value.length === 0 || this.taskCount !== this._tasks$.value.length) {
      this.loadingService.start();
      return this.taskApiService.fetchTasks().pipe(
        tap({
          next: (tasks) => {
            this._tasks$.next(tasks);
            this.taskCount = tasks.length;
            this._hasError$.next(false);
            this.loadingService.stop();
          },
          error: () => {
            this._hasError$.next(true);
            this.loadingService.stop();
          }
        }),
        catchError(() => {
          this._hasError$.next(true);
          return of([]);
        })
      );
    }
    return this.tasks$;
  }


  createTask(task: Task): Observable<Task> {
    return this.taskApiService.createTask(task).pipe(
      tap(newTask => {
        this._tasks$.next([...this._tasks$.value, newTask]);
      })
    );
  }

  updateTask(taskParams: Task): Observable<Task> {
    return this.taskApiService.updateTask(taskParams).pipe(
      tap(updated => {
        const updatedTasks = this._tasks$.value.map(task =>
          task.id === updated.id ? updated : task
        );
        this._tasks$.next(updatedTasks);
      })
    );
  }


  deleteTask(taskId: string): Observable<Task> {
    return this.taskApiService.deleteTask(taskId).pipe(
      tap(() => {
        const filtered = this._tasks$.value.filter(task => task.id !== taskId);
        this._tasks$.next(filtered);
      })
    );
  }

  updateFavoriteStatus(task: Task): Observable<Task> {
    const updated = { ...task, favorite: !task.favorite };
    return this.updateTask(updated);
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
}
