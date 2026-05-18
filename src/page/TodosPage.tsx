import { AddTodoForm } from "@components/AddTodoForm/AddTodoForm";

import styles from "./TodosPage.module.css";

import { type Todo, type TodoInfo, type MetaResponse } from "@/types/todos";

import { TodoFilters } from "@/components/TodoFilters/TodoFilters";
import { TodoList } from "@/components/TodoList/TodoList";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useRevalidator,
} from "react-router";
import { useEffect, type JSX } from "react";
import { Flex } from "antd";
import { Content } from "antd/es/layout/layout";

export function TodosPage(): JSX.Element {
  const data: MetaResponse<Todo, TodoInfo> = useLoaderData();
  const todos = data.data;
  const amountTasks = data.info;
  const revalidator = useRevalidator();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const actionData = useActionData();

  useEffect(() => {
    const interval = setInterval(() => {
      if (revalidator.state === "idle") {
        revalidator.revalidate();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [revalidator]);

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
        <AddTodoForm />
        <TodoFilters amountTasks={amountTasks} />
        {actionData?.error ? (
          <p className={styles.error}>{actionData.error}</p>
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
