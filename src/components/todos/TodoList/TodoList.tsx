import type { JSX } from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";
import { useAppSelector } from "@/store/hooks";
import { selectTodos } from "@/store/todos/todosSelectors";

export function TodoList(): JSX.Element {
  const todos = useAppSelector(selectTodos);
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
