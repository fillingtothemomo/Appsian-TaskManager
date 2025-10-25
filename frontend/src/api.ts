import axios from 'axios';
import { TaskItem } from './types';

const base = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';
const api = axios.create({ baseURL: base });

export const fetchTasks = async (): Promise<TaskItem[]> => {
  const res = await api.get<TaskItem[]>('/tasks');
  return res.data;
};

export const createTask = async (task: Partial<TaskItem>) => {
  const res = await api.post<TaskItem>('/tasks', task);
  return res.data;
};

export const updateTask = async (id: string, task: Partial<TaskItem>) => {
  const res = await api.put<TaskItem>(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
