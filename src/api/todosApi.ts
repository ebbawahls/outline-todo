const BASE_URL = 'https://dummyjson.com/todos';
import type { Todo } from '../types/List';
import axios from 'axios';

export const getTodos = async (): Promise<Todo[]> => {
  const res = await axios.get(BASE_URL);

  return res.data.todos;
};

export const getTodo = async (id: number): Promise<Todo> => {
  const res = await axios.get(`${BASE_URL}/${id}`);

  return res.data;
};

export const createTodo = async (todo: string): Promise<Todo> => {
  const res = await axios.post(`${BASE_URL}/add`, {
    todo,
    completed: false,
    userId: 1,
  });

  return res.data;
};

export const updateTodo = async (
  id: number,
  completed: boolean,
): Promise<Todo> => {
  const res = await axios.put(`${BASE_URL}/${id}`, {
    completed,
  });

  return res.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
