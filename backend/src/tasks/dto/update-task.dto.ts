import { IsString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsBoolean()
  completed: boolean;

  @IsString()
  priority: 'low' | 'medium' | 'high';
}
