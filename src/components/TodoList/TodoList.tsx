import type { JSX } from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";
import type { Todo } from "@/types/todos";

interface TodoListProps {
  todos: Todo[];
  // isLoading: boolean;
  // setIsLoading: (isLoading: boolean) => void;
  loadTodos: () => Promise<void>;
}

export function TodoList({
  todos,
  // isLoading,
  // setIsLoading,
  loadTodos,
}: TodoListProps): JSX.Element {
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          // isLoading={isLoading}
          // setIsLoading={setIsLoading}
          loadTodos={loadTodos}
        />
      ))}
    </ul>
  );
}
