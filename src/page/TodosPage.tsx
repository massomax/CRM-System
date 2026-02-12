import { useEffect, useState } from "react";
import { AddTodoForm } from "@components/AddTodoForm/AddTodoForm";

import styles from "./TodosPage.module.css";
import { getTodos } from "@/api/todosApi";

import { type Todo, type TodoInfo, type filterType } from "@/types/todos";

import { TodoFilters } from "@/components/TodoFilters/TodoFilters";
import { TodoList } from "@/components/TodoList/TodoList";

export function TodosPage() {
  const [countTask, setCountTasks] = useState<TodoInfo | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<filterType>("all");

  const loadTodos = async (filter: filterType = "all") => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos(filter);
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

  useEffect(() => {
    loadTodos(filter);
  }, [filter]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Todo</h1>
        <AddTodoForm
          error={error}
          filter={filter}
          setError={setError}
          loadTodos={loadTodos}
          setLoading={setLoading}
        />
        <TodoFilters
          onFilterChange={handleFilterChange}
          filter={filter}
          countTask={countTask}
        />
        <TodoList
          todos={todos}
          loading={loading}
          setLoading={setLoading}
          setError={setError}
          loadTodos={loadTodos}
          filter={filter}
        />
      </div>
    </div>
  );
}
