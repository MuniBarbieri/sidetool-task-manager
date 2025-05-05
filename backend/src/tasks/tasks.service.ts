import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './models/task.model';

@Injectable()
export class TasksService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.getClient();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { data, error } = await this.client
      .from('tasks')
      .insert([createTaskDto])
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

  async findOne(id: string): Promise<Task> {
    const { data, error } = await this.client
      .from('tasks')
      .select('*')
      .eq('id', id)
      .maybeSingle<Task>();

    if (error) throw new Error(error.message);
    if (!data) throw new NotFoundException(`Task with id "${id}" not found`);

    return data;
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const { data, error } = await this.client
      .from('tasks')
      .update(dto)
      .eq('id', id)
      .select()
      .maybeSingle<Task>();

    if (error) throw new Error(error.message);
    if (!data) throw new NotFoundException(`Task with id "${id}" not found`);

    return data;
  }

  async updateFavorite(id: string, favorite: boolean): Promise<Task> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('tasks')
      .update({ favorite })
      .eq('id', id)
      .select()
      .maybeSingle<Task>();

    if (error) {
      throw new Error(error.message);
    }
    if (!data) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return data;
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    const { error } = await this.client.from('tasks').delete().eq('id', id);
    if (error) throw new Error(error.message);

    return { message: `Task ${id} deleted successfully` };
  }
}
