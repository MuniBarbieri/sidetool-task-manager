import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskApiService } from '../../core/services/task-api.service';
import { Task } from '../../core/models/task.model';

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

  constructor(private fb: FormBuilder, public taskApiService:TaskApiService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      this.taskApiService.createTask(task).subscribe({
        next: (response) => {
          console.log('Task created:', response);
          this.taskForm.reset();
        },
        error: (error) => {
          console.error('Error creating task:', error);
        }
      });
    }
  }
}
