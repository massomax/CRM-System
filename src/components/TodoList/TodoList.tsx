import type { JSX } from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";
import type { Todo } from "@/types/todos";

interface TodoListProps {
  todos: Todo[];
  setLoading: (loading: boolean) => void;
  loadTodos: () => Promise<void>;
}

export function TodoList({
  todos,
  setLoading,
  loadTodos,
}: TodoListProps): JSX.Element {
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setLoading={setLoading}
          loadTodos={loadTodos}
        />
      ))}
    </ul>
  );
}
