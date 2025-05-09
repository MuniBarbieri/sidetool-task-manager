import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../models/task.model';
import { UpdateTaskDto } from '../dto/update-task.dto';

export interface TasksRepository {
  create(dto: CreateTaskDto): Promise<Task>;
  findAll(): Promise<Task[]>;
  findOne(id: string): Promise<Task | null>;
  update(id: string, dto: UpdateTaskDto): Promise<Task | null>;
  updateFavorite(id: string, favorite: boolean): Promise<Task | null>;
  remove(id: string): Promise<void>;
}
