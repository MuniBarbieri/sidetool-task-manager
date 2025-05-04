import { Component } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-bar',
  standalone: false,
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.scss'
})
export class LoadingBarComponent {
  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
}
