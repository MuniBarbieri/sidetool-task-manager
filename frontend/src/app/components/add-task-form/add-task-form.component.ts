import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../core/models/task.model';
import { LoadingService } from '../../core/services/loading.service';
import { Observable } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
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
  @Output() taskUpdated = new EventEmitter<Task>();
  taskForm!: FormGroup;
  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    public taskService: TaskService,
    public loadingService: LoadingService,
    public toastService: ToastService,
    public router: Router,
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    const { title = '', description = '', completed = false } = this.initialTask || {};
    this.taskForm = this.fb.group({
      title: [title, Validators.required],
      description: [description],
      completed: [completed]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;
    this.isEditMode ? this.updateTask() : this.createTask();
  }

  private createTask(): void {
    this.loadingService.start();
    this.taskService.createTask(this.taskForm.value).subscribe({
      next: (task) => this.finishWithSuccess(task,'✅ Tarea creada con éxito'),
      error: (err) => this.finishWithError('Error al crear tarea', err)
    });
  }

  private updateTask(): void {
    if (!this.initialTask) return;
    const updatedTask = { ...this.taskForm.value, id: this.initialTask.id };
    this.loadingService.start();
    this.taskService.updateTask(updatedTask).subscribe({
      next: (task:Task) => this.finishWithSuccess(task,'✅ Tarea editada con éxito'),
      error: (err) => this.finishWithError('Error al actualizar tarea', err)
    });
  }

   deleteTask(): void {
    if (!this.initialTask) return;
    this.loadingService.start();
    this.taskService.deleteTask(this.initialTask.id).subscribe({
      next: (task) =>  this.finishWithSuccess(task,'✅ Tarea Eliminada con éxito'),
      error: (err) => this.finishWithError('Error al eliminar tarea', err)
    });
  }

  private finishWithSuccess(task: Task,message: string): void {
    this.taskForm.reset();
    this.loadingService.stop();
    this.taskUpdated.emit(task);
    this.toastService.show(message);
  }

  private finishWithError(message: string, error: any): void {
    this.loadingService.stop();
    console.error(message, error);
  }
}
