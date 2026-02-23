import { useEffect, useState, useCallback, type JSX } from "react";
import { AddTodoForm } from "@components/AddTodoForm/AddTodoForm";

import styles from "./TodosPage.module.css";
import { getTodos } from "@/api/todosApi";

import { type Todo, type TodoInfo, type FilterType } from "@/types/todos";

import { TodoFilters } from "@/components/TodoFilters/TodoFilters";
import { TodoList } from "@/components/TodoList/TodoList";

export function TodosPage(): JSX.Element {
  
  const [amountTasks, setAmountTasks] = useState<TodoInfo | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [todoFilter, setTodoFilter] = useState<FilterType>("all");

  const loadTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos(todoFilter);
      setTodos(data.data);
      setAmountTasks(data.info);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка при загрузке задач");
      }
    } finally {
      setLoading(false);
    }
  }, [todoFilter]);
  
  const handleFilterChange = (filter: FilterType) => {
    setTodoFilter(filter);
  };

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Todo</h1>
        <AddTodoForm
          loadTodos={loadTodos}
          setLoading={setLoading}
        />
        <TodoFilters
          onFilterChange={handleFilterChange}
          todoFilter={todoFilter}
          amountTasks={amountTasks}
        /> 
        { error ?  (
          <p className={styles.error}>{error}</p>
        ) : loading ? (
          <p>Загрузка задач...</p>
        ) : todos.length === 0 ? (
          <p>Задачи не найдены</p>
        ) : (
        <TodoList
          todos={todos}
          setLoading={setLoading}
          loadTodos={loadTodos}
        />)}
      </div>
    </div>
  );
}
