import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createTaskDto: CreateTaskDto) {
    const client = this.supabaseService.getClient();

    const { data, error } = await client
      .from('tasks')
      .insert([createTaskDto])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findAll() {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findOne(id: string) {
    const client = this.supabaseService.getClient();

    const { data, error } = await client
      .from('tasks')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return data;
  }

async update(id: string, dto: UpdateTaskDto) {
  const client = this.supabaseService.getClient();

  const { data, error } = await client
    .from('tasks')
    .update(dto)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new NotFoundException(`Task with id "${id}" not found`);
  }

  return data;
  }
}
