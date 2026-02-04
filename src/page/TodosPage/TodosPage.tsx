import { useEffect, useState } from "react";
import { AddTodoForm } from "@components/AddTodoForm/AddTodoForm";

import styles from "./TodosPage.module.css";
import { validateTodoTitle } from "@/utils/validation";
import { getTodos, createTodo, deleteTodo, updateTodo } from "@/api/todosApi";

import type { Todo } from "@/types/todos";
import { TodoFilters } from "@/components/TodoFilters/TodoFilters";
import { TodoList } from "@/components/TodoList/TodoList";

export function TodosPage() {
  const [newTitle, setNewTitle] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
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

  const loadTodos = async (filter: string = "all") => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos(filter);
      setTodos(data.data);
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

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    loadTodos(filter);
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
      setLoading(true);
      setError(null);
      await updateTodo(id, { title: newTitle });
      await loadTodos(filter);
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
      <AddTodoForm
        newTitle={newTitle}
        onTitleChange={handleTitleChange}
        onSubmit={handleAddTodo}
        error={error}
      />
      <TodoFilters onFilterChange={handleFilterChange} />
      <TodoList
        todos={todos}
        loading={loading}
        setEditingId={setEditingId}
        onDeleteTodo={handleDeleteTodo}
        handleUpdateTitle={handleUpdateTitle}
        handleToggleIsDone={handleToggleIsDone}
        editingId={editingId}
      />
    </div>
  );
}
