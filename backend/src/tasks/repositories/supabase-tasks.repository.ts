import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../models/task.model';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { SupabaseService } from '../../supabase.service';

@Injectable()
export class SupabaseTasksRepository implements TasksRepository {
  constructor(private readonly supabase: SupabaseService) {}

  private get client() {
    return this.supabase.getClient();
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const { data, error } = await this.client
      .from('tasks')
      .insert([dto])
      .select()
      .single<Task>();

    if (error) throw new Error(error.message);
    return data;
  }

  async findAll(): Promise<Task[]> {
    const {
      data,
      error,
    }: { data: Task[] | null; error: { message: string } | null } =
      await this.client
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async findOne(id: string): Promise<Task | null> {
    const { data, error } = await this.client
      .from('tasks')
      .select('*')
      .eq('id', id)
      .maybeSingle<Task>();

    if (error) throw new Error(error.message);
    return data ?? null;
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task | null> {
    const { data, error } = await this.client
      .from('tasks')
      .update(dto)
      .eq('id', id)
      .select()
      .maybeSingle<Task>();

    if (error) throw new Error(error.message);
    return data ?? null;
  }

  async updateFavorite(id: string, favorite: boolean): Promise<Task | null> {
    const { data, error } = await this.client
      .from('tasks')
      .update({ favorite })
      .eq('id', id)
      .select()
      .maybeSingle<Task>();

    if (error) throw new Error(error.message);
    return data ?? null;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.client.from('tasks').delete().eq('id', id);
    if (error) throw new Error(error.message);
  }
}
