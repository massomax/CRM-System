import { useEffect, useState } from "react";
import { AddTodoForm } from "@components/AddTodoForm/AddTodoForm";

import styles from "./TodosPage.module.css";
import { validateTodoTitle } from "@/utils/validation";
import { getTodos, createTodo, deleteTodo, updateTodo } from "@/utils/todosApi";

import { type Todo, type TodoInfo, type filterType } from "@/types/todos";

import { TodoFilters } from "@/components/TodoFilters/TodoFilters";
import { TodoList } from "@/components/TodoList/TodoList";

export function TodosPage() {
  const [newTitle, setNewTitle] = useState<string>("");
  const [updateTitle, setUpdateTitle] = useState<string>("");
  const [editingId, setEditingId] = useState<Todo["id"] | null>(null);
  const [countTask, setCountTasks] = useState<TodoInfo | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<filterType>("all");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    setError(null);
  };
  const handleUpdateTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.target.value);
    setError(null);
  };
  const handleAddTodo = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const result = validateTodoTitle(newTitle);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setLoading(true);
      setError(null);

      await createTodo({ title: result.value });

      setNewTitle("");
      await loadTodos();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Ошибка при добавлении задачи:", error.message);
      } else {
        setError("Неизвестная ошибка при добавлении задачи");
        console.error("Неизвестная ошибка при добавлении задачи");
      }
    } finally {
      setLoading(false);
    }
  };
  const loadTodos = async (filter: filterType = "all") => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos(filter);
      console.log(data.info);
      setTodos(data.data);
      setCountTasks(data.info);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Ошибка при загрузке задач:", error.message);
      } else {
        setError("Неизвестная ошибка при загрузке задач");
        console.error("Неизвестная ошибка при загрузке задач");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleFilterChange = (filter: filterType) => {
    setFilter(filter);
  };
  const handleDeleteTodo = async (id: Todo["id"]) => {
    try {
      setLoading(true);
      setError(null);
      await deleteTodo(id);
      await loadTodos(filter);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Ошибка при удалении задачи:", error.message);
      } else {
        setError("Неизвестная ошибка при удалении задачи");
        console.error("Неизвестная ошибка при удалении задачи");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateTitle = async (id: Todo["id"], newTitle: string) => {
    try {
      const result = validateTodoTitle(newTitle);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setLoading(true);
      setError(null);
      await updateTodo(id, { title: result.value });
      await loadTodos(filter);
      setUpdateTitle("");
      setEditingId(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Ошибка при обновлении задачи:", error.message);
      } else {
        setError("Неизвестная ошибка при обновлении задачи");
        console.error("Неизвестная ошибка при обновлении задачи");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleToggleIsDone = async (id: Todo["id"], isDone: boolean) => {
    try {
      setLoading(true);
      setError(null);
      await updateTodo(id, { isDone });
      await loadTodos(filter);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Ошибка при обновлении статуса задачи:", error.message);
      } else {
        setError("Неизвестная ошибка при обновлении статуса задачи");
        console.error("Неизвестная ошибка при обновлении статуса задачи");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos(filter);
  }, [filter]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Todo</h1>
        <AddTodoForm
          newTitle={newTitle}
          onTitleChange={handleTitleChange}
          onSubmit={handleAddTodo}
          error={error}
        />
        <TodoFilters
          onFilterChange={handleFilterChange}
          filter={filter}
          countTask={countTask}
        />
        <TodoList
          todos={todos}
          updateTitle={updateTitle}
          loading={loading}
          setEditingId={setEditingId}
          setUpdateTitle={setUpdateTitle}
          onDeleteTodo={handleDeleteTodo}
          onUpdateTitle={handleUpdateTitle}
          onToggleIsDone={handleToggleIsDone}
          onHandleUpdateTitleChange={handleUpdateTitleChange}
          editingId={editingId}
        />
      </div>
    </div>
  );
}
