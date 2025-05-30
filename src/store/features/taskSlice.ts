import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, Subtask } from '../../types/task';
import { v4 as uuidv4 } from 'uuid';

interface TaskState {
  tasks: Task[];
  categories: string[];
}

const initialState: TaskState = {
  tasks: [],
  categories: ['Work', 'Personal', 'Health', 'Education'],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'subtasks' | 'dependencies'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        subtasks: [],
        dependencies: [],
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<Partial<Task> & { id: string }>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
          updatedAt: new Date(),
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    addSubtask: (state, action: PayloadAction<{ taskId: string; subtask: Omit<Subtask, 'id' | 'createdAt' | 'completedAt' | 'completed'> }>) => {
      const task = state.tasks.find(t => t.id === action.payload.taskId);
      if (task) {
        const newSubtask: Subtask = {
          ...action.payload.subtask,
          id: uuidv4(),
          createdAt: new Date(),
          completed: false,
        };
        task.subtasks.push(newSubtask);
      }
    },
    updateSubtask: (state, action: PayloadAction<{ taskId: string; subtaskId: string; updates: Partial<Subtask> }>) => {
      const task = state.tasks.find(t => t.id === action.payload.taskId);
      if (task) {
        const subtask = task.subtasks.find(s => s.id === action.payload.subtaskId);
        if (subtask) {
          Object.assign(subtask, action.payload.updates);
        }
      }
    },
    addDependency: (state, action: PayloadAction<{ taskId: string; dependencyId: string }>) => {
      const task = state.tasks.find(t => t.id === action.payload.taskId);
      if (task && !task.dependencies.includes(action.payload.dependencyId)) {
        task.dependencies.push(action.payload.dependencyId);
      }
    },
    removeDependency: (state, action: PayloadAction<{ taskId: string; dependencyId: string }>) => {
      const task = state.tasks.find(t => t.id === action.payload.taskId);
      if (task) {
        task.dependencies = task.dependencies.filter(id => id !== action.payload.dependencyId);
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  addSubtask,
  updateSubtask,
  addDependency,
  removeDependency,
} = taskSlice.actions;

export default taskSlice.reducer; 