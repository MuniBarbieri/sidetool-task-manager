import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../core/models/task.model';
import { LoadingService } from '../../core/services/loading.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-add-task-form',
  standalone: false,
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent implements OnInit {
  @Input() initialTask?: Task;
  @Input() isEditMode = false;
  @Output() closeDialogEvent = new EventEmitter<Task>();
  taskForm!: FormGroup;
  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    public taskService: TaskService,
    public loadingService: LoadingService,
    public router: Router,
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    const { title = '', description = '', completed = false, priority= 'low' } = this.initialTask || {};
      this.taskForm = this.fb.group({
        title: [title,[Validators.required, Validators.minLength(10)]],
        description: [description],
        completed: [completed],
        priority: [priority],
      });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const taskData : {
      title: string;
      description: string;
      completed: boolean;
      priority: 'low' | 'medium' | 'high';
    }   = this.taskForm.value;
    const taskId = this.initialTask?.id;

    this.taskService.submitTask(this.isEditMode, taskData, taskId).subscribe({
      next: (task: Task) => {
        this.taskForm.reset();
        this.closeDialogEvent.emit(task);
      }
    });
  }

  deleteTask(): void {
    if (!this.initialTask) return;
    this.taskService.deleteTaskWithFeedback(this.initialTask.id).subscribe({
      next: () => this.closeDialogEvent.emit(),
    });
  }
}
