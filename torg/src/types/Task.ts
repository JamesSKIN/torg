import { Category } from './Category';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  category: Category;
} 