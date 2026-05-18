import { createTodo, deleteTodo, getTodos, updateTodo } from "@/api/todosApi";
import type {
  FilterType,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "@/types/todos";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

export const loadTodos = async ({
  request,
}: LoaderFunctionArgs): Promise<MetaResponse<Todo, TodoInfo>> => {
  const url = new URL(request.url);
  const filterValue = url.searchParams.get("filter") || "all";
  const filter: FilterType =
    filterValue === "completed" || filterValue === "inWork"
      ? filterValue
      : "all";
  return await getTodos(filter);
};

export const todosActions = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const id = data.get("id");
  const title = data.get("title") as TodoRequest["title"];
  const completed = data.get("completed");
  const intent = data.get("intent");

  try {
    if (intent === "delete") {
      if (!id) {
        throw new Error("Не указан ID задачи!");
      }

      const validId = Number(id);

      if (isNaN(validId)) {
        throw new Error("ID должен быть числом");
      }

      return await deleteTodo(validId);
    }

    if (intent === "create") {
      if (!title?.trim()) {
        throw new Error("Текст задачи не может быть пустым");
      }
      return await createTodo({ title: title.trim() });
    }

    if (intent === "update") {
      const validId = Number(id);

      if (isNaN(validId)) {
        throw new Error("ID должно быть числом");
      }

      const updateData: TodoRequest = {};

      if (title?.trim()) {
        updateData.title = title.trim();
      }

      if (completed !== null) {
        updateData.isDone = completed === "true";
      }

      if (Object.keys(updateData).length === 0) {
        throw new Error("Нет данных для обновления");
      }
      return await updateTodo(validId, updateData);
    }

    throw new Error("Не известный intent");
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Неизвестная ошибка" };
    }
  }
};
