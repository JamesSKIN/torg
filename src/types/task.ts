export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Subtask {
  id: string;
  title: string;
  description?: string;
  estimatedTime: number; // in minutes
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: Priority;
  status: TaskStatus;
  deadline?: Date;
  subtasks: Subtask[];
  estimatedTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
  dependencies: string[]; // IDs of tasks this task depends on
}

export interface TaskCategory {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface TaskMapNode {
  id: string;
  taskId: string;
  position: {
    x: number;
    y: number;
  };
  connectedTo: string[]; // IDs of connected nodes
} 