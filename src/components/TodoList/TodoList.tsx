import type { JSX } from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";
import type { Todo } from "@/types/todos";

interface TodoListProps {
  todos: Todo[];
  setIsLoading: (isLoading: boolean) => void;
}

export function TodoList({ todos, setIsLoading }: TodoListProps): JSX.Element {
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} setIsLoading={setIsLoading} />
      ))}
    </ul>
  );
}
