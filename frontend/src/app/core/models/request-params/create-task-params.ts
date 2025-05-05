export type CreateTaskParams = {
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}
