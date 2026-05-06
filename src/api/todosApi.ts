import {
  type FilterType,
  type MetaResponse,
  type Todo,
  type TodoInfo,
  type TodoRequest,
} from "@/types/todos";
import { apiRequest } from "./http";

export const getTodos = (filter?: FilterType): Promise<MetaResponse<Todo, TodoInfo>> => {
  const params = filter ? `?filter=${filter}` : "";
  return apiRequest<MetaResponse<Todo, TodoInfo>>("/todos" + params);
};

export const createTodo = (todo: TodoRequest): Promise<Todo> => {
  return apiRequest<Todo, TodoRequest>("/todos", {
    method: "POST",
    body: todo,
  });
};

export const deleteTodo = (id: Todo["id"]): Promise<void> => {
  return apiRequest<void>(`/todos/${id}`, {
    method: "DELETE",
  });
};

export const updateTodo = (id: Todo["id"], todo : TodoRequest): Promise<Todo> => {
  return apiRequest<Todo, TodoRequest>(`/todos/${id}`, {
    method: "PUT",
    body: todo,
  });
}
