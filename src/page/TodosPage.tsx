import { AddTodoForm } from "@components/AddTodoForm/AddTodoForm";

import styles from "./TodosPage.module.css";

import { TodoFilters } from "@/components/TodoFilters/TodoFilters";
import { TodoList } from "@/components/TodoList/TodoList";
import { Flex } from "antd";
import { Content } from "antd/es/layout/layout";
import type { FilterType } from "@/types/todos";
import { useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectTodos,
  selectTodosError,
  selectTodosInfo,
  selectTodosStatus,
} from "@/store/todos/selectors";
import { useEffect, type JSX } from "react";
import { loadTodos, setFilter } from "@/store/todos/todosSlice";

const getValidTodoFilter = (filter: string | null): FilterType => {
  if (filter === "all" || filter === "completed" || filter === "inWork") {
    return filter;
  }
  return "all";
};

export function TodosPage(): JSX.Element {
  const [serachParams, setSearchParams] = useSearchParams();
  const todoFilter = getValidTodoFilter(serachParams.get("filter"));
  const todos = useAppSelector(selectTodos);
  const amountTasks = useAppSelector(selectTodosInfo);
  const status = useAppSelector(selectTodosStatus);
  const error = useAppSelector(selectTodosError);
  const isLoading = status === "pending";
  const dispatch = useAppDispatch();

  const handleFilterChange = (filter: FilterType) => {
    setSearchParams({ filter });
  };

  useEffect(() => {
    dispatch(setFilter(todoFilter));
    dispatch(loadTodos(todoFilter));
  }, [dispatch, todoFilter]);

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
        <AddTodoForm isLoading={isLoading} error={error} />
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
          <TodoList todos={todos} />
        )}
      </Flex>
    </Content>
  );
}
