import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../core/models/task.model';

@Pipe({
  name: 'filterTasks',
  standalone: true,
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: Task[] | null | undefined, search: string): Task[] {
    if (!tasks) return [];
    return tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  }
}
