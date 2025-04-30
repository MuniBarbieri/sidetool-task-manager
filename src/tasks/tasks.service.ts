import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly supabaseService: SupabaseService) {}

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
}
