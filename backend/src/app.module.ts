import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseService } from './supabase.service';
import { SupabaseModule } from './supabase.module';
import { envValidationSchema } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    TasksModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
  exports: [SupabaseService],
})
export class AppModule {}

