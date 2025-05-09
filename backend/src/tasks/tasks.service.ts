import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './models/task.model';
import { TasksRepository } from './repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepository') private readonly repo: TasksRepository,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    return this.repo.create(dto);
  }

  async findAll(): Promise<Task[]> {
    return this.repo.findAll();
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.repo.update(id, dto);
    if (!task) throw new NotFoundException(`Task with id "${id}" not found`);
    return task;
  }

  async updateFavorite(id: string, favorite: boolean): Promise<Task> {
    const task = await this.repo.updateFavorite(id, favorite);
    if (!task) throw new NotFoundException(`Task with id "${id}" not found`);
    return task;
  }

  async remove(id: string): Promise<{ message: string }> {
    const exists = await this.repo.findOne(id);
    if (!exists) throw new NotFoundException(`Task with id "${id}" not found`);
    await this.repo.remove(id);
    return { message: `Task ${id} deleted successfully` };
  }
}
