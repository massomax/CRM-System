import { useEffect, useState } from "react";
import { AddTodoForm } from "@components/AddTodoForm/AddTodoForm";

import styles from "./TodosPage.module.css";
import { validateTodoTitle } from "@/utils/validation";
import { getTodos, createTodo } from "@/api/todosApi";

import type { Todo } from "@/types/todos";
import { TodoFilters } from "@/components/TodoFilters/TodoFilters";
import { TodoList } from "@/components/TodoList/TodoList";

export function TodosPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
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
        error={error}
        setEditingId={setEditingId}
      />
    </div>
  );
}
