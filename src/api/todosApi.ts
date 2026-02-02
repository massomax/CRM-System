import {
  type MetaResponse,
  type Todo,
  type TodoInfo,
  type TodoRequest,
} from "@/types/todos";
import { requestJson } from "./http";

export const getTodos = (filter?: string) => {
  const params = filter ? `?filter=${filter}` : "";
  return requestJson<MetaResponse<Todo, TodoInfo>>("/todos" + params);
};

export const createTodo = (todo: TodoRequest) => {
  return requestJson<Todo, TodoRequest>("/todos", {
    method: "POST",
    body: todo,
  });
};
