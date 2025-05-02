import { Component } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  loading$!: Observable<boolean>;
  constructor(
    private loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.loading$;
  }
}
