import axios from 'axios';
import { TaskItem } from './types';

const API_BASE_URL = 'https://basic-task-manager-l5cz.onrender.com/api/tasks';

export const taskService = {
  getAllTasks: async (): Promise<TaskItem[]> => {
    const response = await axios.get<TaskItem[]>(API_BASE_URL);
    return response.data;
  },

  createTask: async (description: string): Promise<TaskItem> => {
    const response = await axios.post<TaskItem>(API_BASE_URL, {
      description,
      isCompleted: false,
    });
    return response.data;
  },

  updateTask: async (id: string, task: Partial<TaskItem>): Promise<TaskItem> => {
    const response = await axios.put<TaskItem>(`${API_BASE_URL}/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },
};
