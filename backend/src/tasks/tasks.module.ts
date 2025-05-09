import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { SupabaseModule } from '../supabase.module';
import { SupabaseTasksRepository } from './repositories/supabase-tasks.repository';
import { TasksController } from './tasks.controller';

@Module({
  providers: [
    TasksService,
    {
      provide: 'TasksRepository',
      useClass: SupabaseTasksRepository,
    },
  ],
  controllers: [TasksController],
  imports: [SupabaseModule],
  exports: [TasksService],
})
export class TasksModule {}
