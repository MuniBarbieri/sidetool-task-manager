export interface Task {
  id: string;
  title: string;
  description?: string;
  favorite: boolean;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at?: string;
}
