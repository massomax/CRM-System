import {
  type MetaResponse,
  type Todo,
  type TodoInfo,
  type TodoRequest,
} from "@/types/todos";
import { requestJson } from "./http";

export const getTodos = () => {
  return requestJson<MetaResponse<Todo, TodoInfo>>("/todos");
};

export const createTodo = (todo: TodoRequest) => {
  return requestJson<Todo, TodoRequest>("/todos", {
    method: "POST",
    body: todo,
  });
};
