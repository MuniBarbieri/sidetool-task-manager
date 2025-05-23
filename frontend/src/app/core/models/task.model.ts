export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: Date;
  updated_at?: Date;
  favorite: boolean;
  priority: 'low' | 'medium' | 'high';
}
