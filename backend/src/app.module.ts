import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseService } from './supabase.service';
import { SupabaseModule } from './supabase.module';
import { envValidationSchema } from './config/env.validation';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'browser'),
    }),
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
