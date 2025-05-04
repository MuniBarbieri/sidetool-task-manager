export interface Task {
  id: string;
  title: string;
  description?: string;
  favorite: boolean;
  created_at: string;
  updated_at?: string;
}
