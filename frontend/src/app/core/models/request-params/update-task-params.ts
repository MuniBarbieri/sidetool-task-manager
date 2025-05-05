export type UpdateTaskParams = {
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}
