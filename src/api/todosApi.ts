import axios from "axios";
import type {
  FilterType,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "@/types/todos";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getTodos = async (
  filter?: FilterType,
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await api.get<MetaResponse<Todo, TodoInfo>>(`/todos`, {
    params: {
      filter,
    },
  });
  return response.data;
};

export const createTodo = async (todo: TodoRequest): Promise<Todo> => {
  const response = await api.post<Todo>(`/todos`, todo);
  return response.data;
};

export const deleteTodo = async (id: Todo["id"]): Promise<string> => {
  const response = await api.delete<string>(`/todos/${id}`);
  return response.data;
};

export const updateTodo = async (
  id: Todo["id"],
  todo: TodoRequest,
): Promise<Todo> => {
  const response = await api.put<Todo>(`/todos/${id}`, todo);
  return response.data;
};
