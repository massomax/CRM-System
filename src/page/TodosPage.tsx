import { AddTodoForm } from "@components/AddTodoForm/AddTodoForm";

import styles from "./TodosPage.module.css";

import { TodoFilters } from "@/components/TodoFilters/TodoFilters";
import { TodoList } from "@/components/TodoList/TodoList";
import { useCallback, useEffect, useState, type JSX } from "react";
import { Flex } from "antd";
import { Content } from "antd/es/layout/layout";
import type { FilterType, Todo, TodoInfo } from "@/types/todos";
import { getTodos } from "@/api/todosApi";
import { useSearchParams } from "react-router";

const getValidTodoFilter = (filter: string | null): FilterType => {
  if (filter === "all" || filter === "completed" || filter === "inWork") {
    return filter;
  }
  return "all";
};

export function TodosPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [amountTasks, setAmountTasks] = useState<TodoInfo | undefined>();
  const [serachParams, setSearchParams] = useSearchParams();

  const todoFilter = getValidTodoFilter(serachParams.get("filter"));

  const loadTodos = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getTodos(todoFilter);

      setTodos(response.data);
      setAmountTasks(response.info);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка!");
      }
    } finally {
      setIsLoading(false);
    }
  }, [todoFilter]);

  useEffect(() => {
    loadTodos();
    const interval = setInterval(() => {
      loadTodos();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [loadTodos]);

  const handleFilterChange = (filter: FilterType) => {
    setSearchParams({ filter });
  };

  return (
    <Content
      style={{
        padding: "32px 16px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Flex
        vertical
        align="center"
        gap={14}
        style={{ width: "100%", maxWidth: 640 }}
      >
        <h1 className={styles.title}>Todo</h1>
        <AddTodoForm
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          error={error}
          setError={setError}
          loadTodos={loadTodos}
        />
        <TodoFilters
          amountTasks={amountTasks}
          currentTargetFilter={todoFilter}
          handleFilterChange={handleFilterChange}
        />
        {error ? (
          <p>Ошибка: {error}</p>
        ) : isLoading ? (
          <p>Загрузка задач...</p>
        ) : todos.length === 0 ? (
          <p>Задачи не найдены</p>
        ) : (
          <TodoList todos={todos} loadTodos={loadTodos} />
        )}
      </Flex>
    </Content>
  );
}
