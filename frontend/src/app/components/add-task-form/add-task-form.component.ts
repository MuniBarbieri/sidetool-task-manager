import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskApiService } from '../../core/services/task-api.service';
import { Task } from '../../core/models/task.model';
import { LoadingService } from '../../core/services/loading.service';
import { Observable } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task-form',
  standalone: false,
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent implements OnInit {
  @Input() initialTask?: Task;
  @Output() submitTask = new EventEmitter<Task>();
  taskForm!: FormGroup;
  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    public taskApiService:TaskApiService,
    public loadingService: LoadingService,
    public toastService: ToastService,
    public router: Router,
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      this.loadingService.start();
      this.taskApiService.createTask(task).subscribe({
        next: (response) => {
          console.log('Task created:', response);
          this.loadingService.stop();
          this.toastService.show('✅ Tarea creada con éxito');
          this.router.navigate(['/home']);
          this.taskForm.reset();
        },
        error: (error) => {
          this.loadingService.stop();
          console.error('Error creating task:', error);
        }
      });
    }
  }
}
